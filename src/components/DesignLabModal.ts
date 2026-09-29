import { BRANDS } from '../data/brands';
import { COLOR_PALETTES, ACTIVE_CHALLENGE, CommunitySubmissionItem } from '../data/challenges';
import { submitChallengeDesign } from '../firebase/firestore';
import { getCurrentUser } from '../firebase/auth';

export interface DesignLabModalProps {
  onDesignSubmitted: (submission: CommunitySubmissionItem) => void;
}

export function openDesignLabModal(props: DesignLabModalProps) {
  let selectedBrandId = 'nike';
  let selectedTemplate = 'runner'; // 'runner' | 'court' | 'hightop'
  let activeRegion: 'upper' | 'sole' | 'laces' | 'heel' | 'sidePanel' | 'accent' = 'upper';
  let activePaletteIndex = 0;

  // Customizer color state
  const colors: Record<'upper' | 'sole' | 'laces' | 'heel' | 'sidePanel' | 'accent', string> = {
    upper: '#0f172a',
    sole: '#f8fafc',
    laces: '#f97316',
    heel: '#ea580c',
    sidePanel: '#1e293b',
    accent: '#38bdf8'
  };

  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'design-lab-overlay';
  modalOverlay.className = 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn';

  function renderShoeSvg(): string {
    if (selectedTemplate === 'runner') {
      return `
        <svg viewBox="0 0 600 320" class="w-full h-auto max-h-72 filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.7)] select-none">
          <!-- Outsole -->
          <path id="part-sole" class="customizer-path" d="M 70,225 C 100,225 180,230 260,230 C 350,230 460,220 535,215 C 540,245 520,265 470,265 L 100,265 C 65,265 60,245 70,225 Z" fill="${colors.sole}" stroke="#57534e" stroke-width="2"/>
          
          <!-- Cushioning Midsole Bed line -->
          <path d="M 75,235 C 180,240 350,240 520,225" stroke="#78716c" stroke-width="1.5" stroke-dasharray="4,4" fill="none"/>

          <!-- Upper Main Chassis -->
          <path id="part-upper" class="customizer-path" d="M 85,220 C 85,150 140,90 220,70 C 270,60 320,105 380,115 C 440,125 500,160 530,210 C 470,215 360,225 270,225 C 190,225 110,220 85,220 Z" fill="${colors.upper}" stroke="#57534e" stroke-width="2"/>

          <!-- Heel Counter & Achilles Support -->
          <path id="part-heel" class="customizer-path" d="M 85,220 C 75,170 100,110 160,85 C 145,130 140,180 165,223 C 130,222 100,221 85,220 Z" fill="${colors.heel}" stroke="#57534e" stroke-width="2"/>

          <!-- Side Panel / Saddle Support -->
          <path id="part-sidePanel" class="customizer-path" d="M 230,110 C 280,115 320,135 340,175 C 310,215 250,220 210,180 C 195,145 205,120 230,110 Z" fill="${colors.sidePanel}" stroke="#57534e" stroke-width="2"/>

          <!-- Brand Accent Swoosh / Streak -->
          <path id="part-accent" class="customizer-path" d="M 215,160 Q 320,140 430,180 Q 320,185 240,195 Z" fill="${colors.accent}" stroke="#57534e" stroke-width="1.5"/>

          <!-- Laces & Eyelet Webbing -->
          <g id="part-laces" class="customizer-path">
            <path d="M 235,90 L 265,105 M 260,80 L 290,95 M 285,72 L 315,88 M 310,65 L 340,82 M 335,60 L 365,78" stroke="${colors.laces}" stroke-width="6" stroke-linecap="round"/>
            <path d="M 235,90 L 290,95 M 260,80 L 315,88 M 285,72 L 340,82" stroke="${colors.laces}" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
          </g>

          <!-- Collar Lining -->
          <path d="M 160,85 C 185,60 210,60 235,90" stroke="#a8a29e" stroke-width="4" fill="none"/>
        </svg>
      `;
    } else if (selectedTemplate === 'court') {
      return `
        <svg viewBox="0 0 600 320" class="w-full h-auto max-h-72 filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.7)] select-none">
          <!-- Court Cupsole -->
          <path id="part-sole" class="customizer-path" d="M 80,215 L 530,215 C 535,245 515,255 480,255 L 100,255 C 70,255 70,235 80,215 Z" fill="${colors.sole}" stroke="#57534e" stroke-width="2"/>

          <!-- Leather Upper -->
          <path id="part-upper" class="customizer-path" d="M 90,210 C 90,140 130,95 210,85 C 290,75 360,110 430,135 C 490,155 525,185 525,210 Z" fill="${colors.upper}" stroke="#57534e" stroke-width="2"/>

          <!-- Reinforced Heel Tab -->
          <path id="part-heel" class="customizer-path" d="M 90,210 C 85,150 115,100 150,90 L 155,212 Z" fill="${colors.heel}" stroke="#57534e" stroke-width="2"/>

          <!-- Court Lateral Window / Side Panel -->
          <rect id="part-sidePanel" class="customizer-path" x="240" y="130" width="130" height="60" rx="8" fill="${colors.sidePanel}" stroke="#57534e" stroke-width="2"/>

          <!-- Accent Toe Box Overlay -->
          <path id="part-accent" class="customizer-path" d="M 440,165 C 470,175 510,190 520,210 L 440,210 Z" fill="${colors.accent}" stroke="#57534e" stroke-width="2"/>

          <!-- Laces -->
          <g id="part-laces" class="customizer-path">
            <path d="M 230,105 L 280,105 M 250,95 L 300,95 M 270,85 L 320,85" stroke="${colors.laces}" stroke-width="5" stroke-linecap="round"/>
          </g>
        </svg>
      `;
    } else {
      // High-top Canvas
      return `
        <svg viewBox="0 0 600 320" class="w-full h-auto max-h-72 filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.7)] select-none">
          <!-- Vulcanized Outsole & Egret Tape -->
          <path id="part-sole" class="customizer-path" d="M 90,225 L 530,225 C 530,255 500,260 460,260 L 110,260 C 85,260 80,240 90,225 Z" fill="${colors.sole}" stroke="#57534e" stroke-width="2"/>

          <!-- High-Top Canvas Shaft & Upper -->
          <path id="part-upper" class="customizer-path" d="M 110,220 L 110,55 L 210,55 L 260,115 L 430,160 C 490,180 525,200 525,220 Z" fill="${colors.upper}" stroke="#57534e" stroke-width="2"/>

          <!-- Heel Counter Spine -->
          <path id="part-heel" class="customizer-path" d="M 110,220 L 110,55 L 140,55 L 140,220 Z" fill="${colors.heel}" stroke="#57534e" stroke-width="2"/>

          <!-- Circular Ankle Badge / Side Panel -->
          <circle id="part-sidePanel" class="customizer-path" cx="175" cy="115" r="28" fill="${colors.sidePanel}" stroke="#57534e" stroke-width="2"/>

          <!-- Toe Cap Rubber Accent -->
          <path id="part-accent" class="customizer-path" d="M 465,185 C 495,195 520,205 525,222 L 465,222 Z" fill="${colors.accent}" stroke="#57534e" stroke-width="2"/>

          <!-- Laces Cross-Weave -->
          <g id="part-laces" class="customizer-path">
            <path d="M 195,70 L 225,95 M 220,90 L 250,115 M 245,110 L 285,135 M 280,130 L 330,150 M 325,145 L 380,165" stroke="${colors.laces}" stroke-width="4" stroke-linecap="round"/>
          </g>
        </svg>
      `;
    }
  }

  function render() {
    const user = getCurrentUser();
    const activePalette = COLOR_PALETTES[activePaletteIndex];

    modalOverlay.innerHTML = `
      <div class="relative w-full max-w-5xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        <!-- Header -->
        <div class="px-6 py-4 border-b border-stone-800 bg-stone-950/80 flex items-center justify-between shrink-0">
          <div>
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-[10px] font-mono font-bold text-orange-400 uppercase">
                Shoe Design Lab
              </span>
              <span class="text-xs text-stone-400 font-mono">Week #${ACTIVE_CHALLENGE.weekNumber} Edition</span>
            </div>
            <h2 class="font-display font-bold text-xl sm:text-2xl text-white">
              Vector Colorway Studio
            </h2>
          </div>

          <button id="close-lab-btn" class="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Studio Body Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          <!-- Left Column: Interactive Vector Canvas & Region Selectors (Col 7) -->
          <div class="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-stone-800 flex flex-col justify-between space-y-6">
            
            <!-- Step 1 & 2: Brand & Silhouette Picker -->
            <div class="flex flex-wrap items-center justify-between gap-3">
              
              <!-- Brand selector -->
              <div class="flex items-center gap-2">
                <label class="text-xs text-stone-400 font-mono">Brand:</label>
                <select id="lab-brand-select" class="bg-stone-950 border border-stone-800 rounded-xl py-1.5 px-3 text-xs text-stone-200 focus:outline-none focus:border-orange-500">
                  ${BRANDS.map(b => `
                    <option value="${b.id}" ${selectedBrandId === b.id ? 'selected' : ''}>${b.name}</option>
                  `).join('')}
                </select>
              </div>

              <!-- Silhouette model picker -->
              <div class="flex items-center gap-1.5 p-1 rounded-xl bg-stone-950 border border-stone-800 text-xs">
                <button data-tpl="runner" class="tpl-btn px-3 py-1 rounded-lg transition ${selectedTemplate === 'runner' ? 'bg-orange-600 text-white font-bold' : 'text-stone-400 hover:text-stone-200'}">
                  Road Runner
                </button>
                <button data-tpl="court" class="tpl-btn px-3 py-1 rounded-lg transition ${selectedTemplate === 'court' ? 'bg-orange-600 text-white font-bold' : 'text-stone-400 hover:text-stone-200'}">
                  Retro Court
                </button>
                <button data-tpl="hightop" class="tpl-btn px-3 py-1 rounded-lg transition ${selectedTemplate === 'hightop' ? 'bg-orange-600 text-white font-bold' : 'text-stone-400 hover:text-stone-200'}">
                  High-Top Canvas
                </button>
              </div>

            </div>

            <!-- Interactive Vector Canvas -->
            <div class="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-stone-950 to-stone-900 border border-stone-800 flex items-center justify-center min-h-[260px] overflow-hidden">
              ${renderShoeSvg()}
              <div class="absolute bottom-2 left-4 text-[10px] text-stone-500 font-mono">
                Click any shoe segment to paint with selected color
              </div>
            </div>

            <!-- Region Targeting Buttons -->
            <div>
              <div class="text-xs font-mono text-stone-400 mb-2">Target Segment:</div>
              <div class="grid grid-cols-3 sm:grid-cols-6 gap-2">
                ${[
                  { id: 'upper', label: 'Upper' },
                  { id: 'sole', label: 'Sole' },
                  { id: 'laces', label: 'Laces' },
                  { id: 'heel', label: 'Heel' },
                  { id: 'sidePanel', label: 'Side Panel' },
                  { id: 'accent', label: 'Accent' },
                ].map(r => `
                  <button data-region="${r.id}" class="region-btn p-2 rounded-xl border flex flex-col items-center gap-1.5 transition ${activeRegion === r.id ? 'border-orange-500 bg-orange-500/10' : 'border-stone-800 bg-stone-950 hover:border-stone-700'}">
                    <span class="w-4 h-4 rounded-full border border-stone-700" style="background-color: ${colors[r.id as keyof typeof colors]}"></span>
                    <span class="text-[11px] font-medium text-stone-300 capitalize">${r.label}</span>
                  </button>
                `).join('')}
              </div>
            </div>

          </div>

          <!-- Right Column: Palette & Submission Controls (Col 5) -->
          <div class="lg:col-span-5 p-6 flex flex-col justify-between space-y-6 bg-stone-950/40">
            
            <div class="space-y-5">
              
              <!-- Palette Selector -->
              <div>
                <div class="flex items-center justify-between mb-2">
                  <label class="text-xs font-mono text-stone-400 uppercase">Curated Palettes:</label>
                  <span class="text-[11px] text-orange-400 font-medium">${activePalette.category}</span>
                </div>

                <div class="flex flex-wrap gap-1.5 mb-3">
                  ${COLOR_PALETTES.map((p, idx) => `
                    <button data-pal-idx="${idx}" class="palette-tab-btn px-2.5 py-1 rounded-lg text-xs transition ${activePaletteIndex === idx ? 'bg-stone-800 text-white border border-orange-500' : 'bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200'}">
                      ${p.name}
                    </button>
                  `).join('')}
                </div>

                <!-- Swatches for active palette -->
                <div class="flex items-center gap-2">
                  ${activePalette.palette.map(hex => `
                    <button data-hex="${hex}" class="color-swatch-btn w-9 h-9 rounded-xl border-2 border-stone-800 hover:scale-110 transition shadow" style="background-color: ${hex}" title="${hex}"></button>
                  `).join('')}
                  
                  <!-- Custom Hex Picker -->
                  <div class="relative ml-2">
                    <input id="custom-hex-input" type="color" value="${colors[activeRegion]}" class="w-9 h-9 rounded-xl bg-transparent cursor-pointer border border-stone-700" title="Pick custom color" />
                  </div>
                </div>
              </div>

              <!-- Submission Form -->
              <div class="pt-4 border-t border-stone-800 space-y-3">
                <h4 class="font-display font-bold text-sm text-white flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                  Submit to Week #${ACTIVE_CHALLENGE.weekNumber} Challenge
                </h4>
                
                <div>
                  <label class="block text-[11px] font-mono text-stone-400 mb-1">Colorway Title</label>
                  <input id="sub-title-input" type="text" placeholder="e.g. Midnight Horizon Runner" class="w-full bg-stone-900 border border-stone-800 rounded-xl py-2 px-3 text-xs text-stone-200 focus:outline-none focus:border-orange-500" value="My Custom Sole" />
                </div>

                <div>
                  <label class="block text-[11px] font-mono text-stone-400 mb-1">Creator Name / Handle</label>
                  <input id="sub-author-input" type="text" placeholder="e.g. Alex Chen" class="w-full bg-stone-900 border border-stone-800 rounded-xl py-2 px-3 text-xs text-stone-200 focus:outline-none focus:border-orange-500" value="${user?.displayName || 'Sneaker Creator'}" />
                </div>

                <div>
                  <label class="block text-[11px] font-mono text-stone-400 mb-1">Design Inspiration (Optional)</label>
                  <textarea id="sub-story-input" rows="2" placeholder="Tell the community what inspired your color choices..." class="w-full bg-stone-900 border border-stone-800 rounded-xl py-2 px-3 text-xs text-stone-200 focus:outline-none focus:border-orange-500"></textarea>
                </div>

                <p class="text-[11px] text-stone-500 italic">
                  * Note: Selected community designs may inspire future colorways. Submissions will be displayed in the public gallery.
                </p>
              </div>

            </div>

            <!-- Submit Button -->
            <div class="pt-4 border-t border-stone-800">
              <button id="submit-design-btn" class="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 transition flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Publish Design to Challenge
              </button>
            </div>

          </div>

        </div>

      </div>
    `;

    // Attach listeners
    modalOverlay.querySelector('#close-lab-btn')?.addEventListener('click', () => modalOverlay.remove());

    modalOverlay.querySelectorAll('.tpl-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        selectedTemplate = (e.currentTarget as HTMLElement).getAttribute('data-tpl') as any;
        render();
      });
    });

    const brandSelect = modalOverlay.querySelector('#lab-brand-select') as HTMLSelectElement | null;
    brandSelect?.addEventListener('change', (e) => {
      selectedBrandId = (e.target as HTMLSelectElement).value;
    });

    modalOverlay.querySelectorAll('.region-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeRegion = (e.currentTarget as HTMLElement).getAttribute('data-region') as any;
        render();
      });
    });

    modalOverlay.querySelectorAll('.palette-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activePaletteIndex = parseInt((e.currentTarget as HTMLElement).getAttribute('data-pal-idx') || '0', 10);
        render();
      });
    });

    modalOverlay.querySelectorAll('.color-swatch-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const hex = (e.currentTarget as HTMLElement).getAttribute('data-hex');
        if (hex) {
          colors[activeRegion] = hex;
          render();
        }
      });
    });

    const hexInput = modalOverlay.querySelector('#custom-hex-input') as HTMLInputElement | null;
    hexInput?.addEventListener('input', (e) => {
      colors[activeRegion] = (e.target as HTMLInputElement).value;
      render();
    });

    // Path clicks inside SVG directly select and paint
    modalOverlay.querySelectorAll('.customizer-path').forEach(path => {
      path.addEventListener('click', (e) => {
        const id = (e.currentTarget as SVGElement).id.replace('part-', '') as keyof typeof colors;
        if (colors[id] !== undefined) {
          activeRegion = id;
          // Apply active swatch color or switch active region
          render();
        }
      });
    });

    // Submission handler
    modalOverlay.querySelector('#submit-design-btn')?.addEventListener('click', async () => {
      const titleInput = modalOverlay.querySelector('#sub-title-input') as HTMLInputElement | null;
      const authorInput = modalOverlay.querySelector('#sub-author-input') as HTMLInputElement | null;
      const storyInput = modalOverlay.querySelector('#sub-story-input') as HTMLTextAreaElement | null;

      const title = titleInput?.value.trim() || 'My Custom Sole';
      const author = authorInput?.value.trim() || 'Sneaker Creator';
      const story = storyInput?.value.trim() || '';

      const brand = BRANDS.find(b => b.id === selectedBrandId)?.name || 'Custom';
      const modelName = selectedTemplate === 'runner' ? 'Air Zoom Silhouette' : selectedTemplate === 'court' ? 'Retro Court Silhouette' : 'High-Top Canvas Silhouette';

      const newSubmission: CommunitySubmissionItem = {
        id: 'sub_' + Date.now().toString(36),
        challengeId: ACTIVE_CHALLENGE.id,
        creatorName: author,
        shoeModel: modelName,
        brandName: brand,
        title,
        story,
        colors: { ...colors },
        voteCount: 1,
        createdAt: new Date().toISOString()
      };

      try {
        await submitChallengeDesign({
          ...newSubmission,
          userId: user?.uid || 'anon_' + Date.now()
        });
      } catch (err) {
        console.warn('Persisted to local state:', err);
      }

      props.onDesignSubmitted(newSubmission);
      modalOverlay.remove();
    });
  }

  render();
  document.body.appendChild(modalOverlay);
}
