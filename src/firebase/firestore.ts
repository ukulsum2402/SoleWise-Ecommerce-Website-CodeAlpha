import { 
  collection, 
  doc, 
  getDocFromServer, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  query, 
  where,
  updateDoc,
  increment,
  onSnapshot
} from 'firebase/firestore';
import { db, auth } from './config';
import { handleFirestoreError, OperationType } from './error-handler';

// Test connection on boot as mandated by skill
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Please check your Firebase configuration.");
      return false;
    }
    // Document might not exist which is fine, connection succeeded
    return true;
  }
}

export interface StoredCartItem {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  brandName: string;
  priceINR: number;
  price?: number; // legacy alias
  currency: 'INR';
  size: string;
  color: string;
  quantity: number;
  imageUrl: string;
  addedAt: string;
}

export interface StoredOrderItem {
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    productName: string;
    brandName: string;
    priceINR: number;
    price?: number; // legacy alias
    size: string;
    color: string;
    quantity: number;
    imageUrl: string;
  }>;
  totalAmountINR: number;
  totalAmount?: number; // legacy alias
  currency: 'INR';
  status: string;
  recipientName: string;
  shippingAddress: string;
  phoneNumber?: string;
  trackingNumber: string;
  createdAt: string;
}

export interface StoredSubmission {
  id: string;
  challengeId: string;
  userId: string;
  creatorName: string;
  shoeModel: string;
  brandName: string;
  title: string;
  story?: string;
  colors: {
    upper: string;
    sole: string;
    laces: string;
    heel: string;
    sidePanel: string;
    accent: string;
  };
  voteCount: number;
  createdAt: string;
}

// Cart operations
export async function fetchUserCart(userId: string): Promise<StoredCartItem[]> {
  const path = 'cart';
  try {
    const q = query(collection(db, path), where('userId', '==', userId));
    const snap = await getDocs(q);
    const items: StoredCartItem[] = [];
    snap.forEach((d) => items.push(d.data() as StoredCartItem));
    return items;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

export async function saveCartItem(item: StoredCartItem): Promise<void> {
  const path = `cart/${item.id}`;
  try {
    await setDoc(doc(db, 'cart', item.id), item);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function removeCartItemFromDb(itemId: string): Promise<void> {
  const path = `cart/${itemId}`;
  try {
    await deleteDoc(doc(db, 'cart', itemId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// Wishlist operations
export async function fetchUserWishlist(userId: string): Promise<string[]> {
  const path = 'wishlist';
  try {
    const q = query(collection(db, path), where('userId', '==', userId));
    const snap = await getDocs(q);
    const productIds: string[] = [];
    snap.forEach((d) => {
      const data = d.data();
      if (data.productId) productIds.push(data.productId);
    });
    return productIds;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

export async function saveWishlistItem(userId: string, productId: string): Promise<void> {
  const id = `${userId}_${productId}`;
  const path = `wishlist/${id}`;
  try {
    await setDoc(doc(db, 'wishlist', id), {
      id,
      userId,
      productId,
      addedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function removeWishlistItemFromDb(userId: string, productId: string): Promise<void> {
  const id = `${userId}_${productId}`;
  const path = `wishlist/${id}`;
  try {
    await deleteDoc(doc(db, 'wishlist', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// Order operations
export async function placeOrderInDb(order: StoredOrderItem): Promise<void> {
  const path = `orders/${order.id}`;
  try {
    await setDoc(doc(db, 'orders', order.id), order);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function fetchUserOrders(userId: string): Promise<StoredOrderItem[]> {
  const path = 'orders';
  try {
    const q = query(collection(db, path), where('userId', '==', userId));
    const snap = await getDocs(q);
    const orders: StoredOrderItem[] = [];
    snap.forEach((d) => orders.push(d.data() as StoredOrderItem));
    return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

// Challenge Submissions
export async function fetchChallengeSubmissions(challengeId: string): Promise<StoredSubmission[]> {
  const path = 'submissions';
  try {
    const snap = await getDocs(collection(db, path));
    const list: StoredSubmission[] = [];
    snap.forEach((d) => {
      const data = d.data() as StoredSubmission;
      if (data.challengeId === challengeId) {
        list.push(data);
      }
    });
    return list.sort((a, b) => b.voteCount - a.voteCount);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

export function subscribeToChallengeSubmissions(
  challengeId: string, 
  callback: (submissions: StoredSubmission[]) => void
): () => void {
  const path = 'submissions';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      const list: StoredSubmission[] = [];
      snapshot.forEach((d) => {
        const data = d.data() as StoredSubmission;
        if (data.challengeId === challengeId) {
          list.push(data);
        }
      });
      callback(list.sort((a, b) => b.voteCount - a.voteCount));
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export async function submitChallengeDesign(submission: StoredSubmission): Promise<void> {
  const path = `submissions/${submission.id}`;
  try {
    await setDoc(doc(db, 'submissions', submission.id), submission);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function voteForSubmissionInDb(submissionId: string, userId: string): Promise<boolean> {
  const voteId = `${submissionId}_${userId}`;
  const votePath = `votes/${voteId}`;
  const submissionPath = `submissions/${submissionId}`;
  try {
    // Record vote
    await setDoc(doc(db, 'votes', voteId), {
      id: voteId,
      submissionId,
      userId,
      createdAt: new Date().toISOString(),
    });

    // Increment submission counter
    await updateDoc(doc(db, 'submissions', submissionId), {
      voteCount: increment(1),
    });
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, votePath);
    return false;
  }
}
