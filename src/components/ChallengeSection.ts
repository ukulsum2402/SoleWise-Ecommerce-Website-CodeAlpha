import { ACTIVE_CHALLENGE, CommunitySubmissionItem } from '../data/challenges';
import { voteForSubmissionInDb } from '../firebase/firestore';
import { getCurrentUser } from '../firebase/auth';

export interface ChallengeSectionProps {
  submissions: CommunitySubmissionItem[];
  onOpenDesignLab: () => void;
  onVoteCast: (submissionId: string) => void;
}

export function renderChallengeSection(container: HTMLElement, props: ChallengeSectionProps) {
  const user = getCurrentUser();

  function renderSubmissionsGrid(): string {
    if (props.submissions.length === 0) {
      return `
        <div class="col-span-full py-12 text-center rounded-2xl bg-stone-900/40 border border-stone-800 text-stone-400 text-xs">
          No designs submitted yet for this challenge. Be the first to create one!
        </div>
      `;
    }

    return props.submissions.map(sub => {
      const formattedDate = new Date(sub.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric'
      });

      return `
        <div class="flex flex-col rounded-2xl bg-stone-900/80 border border-stone-800 overflow-hidden card-hover-effect">
          
          <!-- Vector Shoe Mini Preview -->
          <div class="p-6 bg-stone-950 flex items-center justify-center relative overflow-hidden border-b border-stone-850">
            <svg viewBox="0 0 600 320" class="w-full h-auto max-h-36 filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
              <!-- Outsole -->
              <path d="M 70,225 C 100,225 180,230 260,230 C 350,230 460,220 535,215 C 540,245 520,265 470,265 L 100,265 C 65,265 60,245 70,225 Z" fill="${sub.colors.sole}" stroke="#57534e" stroke-width="2"/>
              <!-- Upper -->
              <path d="M 85,220 C 85,150 140,90 220,70 C 270,60 320,105 380,115 C 440,125 500,160 530,210 C 470,215 360,225 270,225 C 190,225 110,220 85,220 Z" fill="${sub.colors.upper}" stroke="#57534e" stroke-width="2"/>
              <!-- Heel -->
              <path d="M 85,220 C 75,170 100,110 160,85 C 145,130 140,180 165,223 C 130,222 100,221 85,220 Z" fill="${sub.colors.heel}" stroke="#57534e" stroke-width="2"/>
              <!-- Side Panel -->
              <path d="M 230,110 C 280,115 320,135 340,175 C 310,215 250,220 210,180 C 195,145 205,120 230,110 Z" fill="${sub.colors.sidePanel}" stroke="#57534e" stroke-width="2"/>
              <!-- Accent -->
              <path d="M 215,160 Q 320,140 430,180 Q 320,185 240,195 Z" fill="${sub.colors.accent}" stroke="#57534e" stroke-width="1.5"/>
              <!-- Laces -->
              <path d="M 235,90 L 265,105 M 260,80 L 290,95 M 285,72 L 315,88 M 310,65 L 340,82" stroke="${sub.colors.laces}" stroke-width="5" stroke-linecap="round"/>
            </svg>

            <!-- Brand Tag -->
            <span class="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-stone-900/90 text-stone-300 text-[10px] font-mono border border-stone-800">
              ${sub.brandName}
            </span>
          </div>

          <!-- Card Content -->
          <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
            <div>
              <div class="flex items-center justify-between text-[11px] text-stone-400 font-mono mb-1">
                <span>By ${sub.creatorName}</span>
                <span>${formattedDate}</span>
              </div>
              <h4 class="font-display font-bold text-base text-white truncate" title="${sub.title}">
                ${sub.title}
              </h4>
              ${sub.story ? `
                <p class="text-xs text-stone-400 line-clamp-2 mt-1 leading-relaxed italic">
                  "${sub.story}"
                </p>
              ` : ''}
            </div>

            <!-- Color Swatches Bar -->
            <div class="flex items-center justify-between pt-2 border-t border-stone-850">
              <div class="flex items-center -space-x-1">
                ${Object.values(sub.colors).map(hex => `
                  <span class="w-4 h-4 rounded-full border border-stone-800 shadow" style="background-color: ${hex}"></span>
                `).join('')}
              </div>

              <!-- Upvote Button -->
              <button data-vote-id="${sub.id}" class="vote-btn px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-orange-600/20 hover:text-orange-400 text-stone-300 border border-stone-750 text-xs font-semibold transition flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                </svg>
                <span class="vote-count">${sub.voteCount}</span>
              </button>
            </div>

          </div>

        </div>
      `;
    }).join('');
  }

  container.innerHTML = `
    <section id="challenges-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-stone-850">
      
      <!-- Challenge Banner -->
      <div class="relative rounded-3xl p-8 sm:p-12 glass-panel border border-stone-800 overflow-hidden mb-12">
        <div class="absolute -right-24 -bottom-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="max-w-3xl space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold uppercase">
            <span>Weekly Design Challenge #42</span>
            <span>• Active Contest</span>
          </div>

          <h2 class="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            ${ACTIVE_CHALLENGE.title}
          </h2>

          <p class="text-sm sm:text-base text-stone-300 leading-relaxed">
            ${ACTIVE_CHALLENGE.prompt}
          </p>

          <p class="text-xs text-stone-400 italic">
            * Disclaimer: ${ACTIVE_CHALLENGE.guideline}
          </p>

          <div class="pt-2 flex flex-wrap items-center gap-4">
            <button id="challenge-enter-btn" class="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 transition flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Customize & Enter Design
            </button>

            <span class="text-xs text-stone-400 font-mono">
              ${props.submissions.length} Community Submissions
            </span>
          </div>
        </div>
      </div>

      <!-- Submissions Gallery Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="font-display font-bold text-xl sm:text-2xl text-white">
            Community Showcase & Voting
          </h3>
          <p class="text-xs text-stone-400 mt-0.5">
            Vote for designs you'd love to see inspire future brand palettes.
          </p>
        </div>
      </div>

      <!-- Submissions Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${renderSubmissionsGrid()}
      </div>

    </section>
  `;

  // Attach handlers
  container.querySelector('#challenge-enter-btn')?.addEventListener('click', props.onOpenDesignLab);

  container.querySelectorAll('.vote-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const subId = (e.currentTarget as HTMLElement).getAttribute('data-vote-id');
      if (subId) {
        props.onVoteCast(subId);
        try {
          await voteForSubmissionInDb(subId, user?.uid || 'guest_' + Date.now());
        } catch (err) {
          console.warn('Recorded local vote:', err);
        }
      }
    });
  });
}
