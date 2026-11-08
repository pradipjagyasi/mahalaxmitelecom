'use client';

// Full-HD WebP frames extracted directly from the source video. A small group
// is decoded for first paint; remaining bytes are cached in the background.
export type Variant = 'desktop' | 'mobile';

export interface Slice {
  img: HTMLImageElement;
  sx: number;
  sy: number;
  sw: number;
  sh: number;
}

interface FrameManifest {
  total: number;
  width: number;
  height: number;
}

const CACHE_NAME = 'mahalaxmi-flythrough-hd-v1';
const MANIFEST_URL = '/page-section2/hires/manifest.json';
const FRAME_BASE = '/page-section2/hires/';
const LOGO_URL = '/mahalaxmi-logo.png';
export const SCROLL_VIDEO_URL = '/page-section2/JM%20scrolling-temp-smooth.mp4';
export const ZERO_URL = `${FRAME_BASE}frame-000.webp`;
const HERO_URLS = [
  '/page-section%201/Slider/1.png',
  '/page-section%201/Slider/2.png',
  '/page-section%201/Slider/3.png',
  '/page-section%201/Slider/4.png',
  '/page-section%201/Slider/5.png',
  '/page-section%201/Slider/6.png',
  '/page-section%201/Slider/7.png',
  '/page-section%201/Slider/8.png',
];

const HOMEPAGE_IMAGE_URLS = [
  ...HERO_URLS,
  '/page-section2/poster-desktop.jpg',
  '/page-section2/poster-mobile.jpg',
  '/landing-stores/Jagyasi%20Mobile.png',
  '/landing-stores/MM%20mobile.png',
  '/landing-stores/Phone%20Cafe.png',
  '/landing-stores/Mobile%20Point.png',
  '/mahalaxmi-logo.png',
  '/mahalaxmi-logo-bg.png',
  '/footer-store.jpg',
  '/icons/call.svg',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1646861039459-fd9e3aabf3fb?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1599855129764-f4cc28295202?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1668649176554-3ad841a780d0?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550029402-8280f657d8d1?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550029402-8ea9bfe19f04?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=70&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1563237602-b68d2dfb3f3b?w=600&q=70&auto=format&fit=crop',
];

let scrollVideoPromise: Promise<string> | null = null;
let homepagePreloadPromise: Promise<void> | null = null;
let homepageProgress = 0;
const homepageProgressListeners = new Set<(progress: number) => void>();

const IMAGE_PROGRESS_WEIGHT = 38;
const VIDEO_PROGRESS_WEIGHT = 62;
const IMAGE_TIMEOUT_MS = 30_000;
const VIDEO_TIMEOUT_MS = 120_000;

const emitHomepageProgress = (nextProgress: number) => {
  homepageProgress = Math.max(homepageProgress, Math.min(100, nextProgress));
  homepageProgressListeners.forEach((listener) => listener(homepageProgress));
};

const decodeImage = (url: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    let settled = false;
    const finish = (callback: () => void) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      image.onload = null;
      image.onerror = null;
      callback();
    };
    const timeout = window.setTimeout(() => {
      finish(() => reject(new Error(`Image preload timed out: ${url}`)));
    }, IMAGE_TIMEOUT_MS);
    image.onload = () => {
      // onload proves the complete response is in the browser cache. Decode is
      // best-effort because some SVG/browser combinations do not implement it.
      void image.decode().catch(() => undefined).finally(() => finish(resolve));
    };
    image.onerror = () => {
      finish(() => reject(new Error(`Image preload failed: ${url}`)));
    };
    image.decoding = 'async';
    image.src = url;
  });

export const preloadScrollVideo = (onProgress: (fraction: number) => void = () => {}): Promise<string> => {
  if (scrollVideoPromise) {
    void scrollVideoPromise.then(() => onProgress(1), () => {});
    return scrollVideoPromise;
  }

  const controller = new AbortController();
  const requestTimeout = window.setTimeout(() => controller.abort(), VIDEO_TIMEOUT_MS);

  scrollVideoPromise = fetch(SCROLL_VIDEO_URL, {
    cache: 'force-cache',
    signal: controller.signal,
  })
    .then((response) => {
      if (!response.ok) throw new Error(`Video request failed with status ${response.status}`);
      if (!response.body) {
        return response.blob().then((blob) => {
          onProgress(1);
          return blob;
        });
      }
      const total = Number(response.headers.get('content-length')) || 0;
      const reader = response.body.getReader();
      const chunks: BlobPart[] = [];
      let received = 0;
      const read = (): Promise<Blob> =>
        reader.read().then(({ done, value }) => {
          if (done) {
            onProgress(1);
            return new Blob(chunks, { type: 'video/mp4' });
          }
          if (value) {
            chunks.push(value);
            received += value.byteLength;
            if (total > 0) onProgress(Math.min(1, received / total));
          }
          return read();
        });
      return read();
    })
    .then((blob) => {
      const objectUrl = URL.createObjectURL(blob);
      return new Promise<string>((resolve, reject) => {
        const video = document.createElement('video');
        let settled = false;
        const timeout = window.setTimeout(() => {
          if (settled) return;
          settled = true;
          URL.revokeObjectURL(objectUrl);
          reject(new Error('Scroll video readiness timed out'));
        }, 20000);
        const finish = () => {
          if (settled) return;
          settled = true;
          window.clearTimeout(timeout);
          video.remove();
          resolve(objectUrl);
        };
        video.preload = 'auto';
        video.muted = true;
        video.src = objectUrl;
        video.onloadedmetadata = () => {
          if (video.duration > 0) {
            video.currentTime = Math.min(0.05, Math.max(0, video.duration - 0.05));
          } else {
            finish();
          }
        };
        video.onloadeddata = finish;
        video.oncanplay = finish;
        video.onseeked = finish;
        video.onerror = () => {
          if (settled) return;
          settled = true;
          window.clearTimeout(timeout);
          video.remove();
          URL.revokeObjectURL(objectUrl);
          reject(new Error('Scroll video decode failed'));
        };
        video.load();
      });
    })
    .catch((error) => {
      scrollVideoPromise = null;
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new Error('Scroll video download timed out');
      }
      throw error;
    })
    .finally(() => window.clearTimeout(requestTimeout));
  return scrollVideoPromise;
};

export const preloadHomepageAssets = (onProgress: (progress: number) => void): Promise<void> => {
  homepageProgressListeners.add(onProgress);
  onProgress(homepageProgress);

  if (homepagePreloadPromise) {
    return homepagePreloadPromise.finally(() => homepageProgressListeners.delete(onProgress));
  }

  homepagePreloadPromise = (async () => {
    homepageProgress = 0;
    emitHomepageProgress(1);
    let completedImages = 0;
    let videoFraction = 0;

    const reportProgress = () => {
      const imageFraction = completedImages / HOMEPAGE_IMAGE_URLS.length;
      emitHomepageProgress(
        Math.min(99, 1 + imageFraction * (IMAGE_PROGRESS_WEIGHT - 1) + videoFraction * VIDEO_PROGRESS_WEIGHT),
      );
    };

    // The video starts first and downloads in parallel with the image queue so
    // it receives bandwidth throughout the loading-screen experience.
    const videoTask = preloadScrollVideo((fraction) => {
      videoFraction = fraction;
      reportProgress();
    });

    const imageResults = await Promise.allSettled(
      HOMEPAGE_IMAGE_URLS.map(async (url) => {
        try {
          await decodeImage(url);
        } finally {
          completedImages += 1;
          reportProgress();
        }
      }),
    );
    const videoResult = await Promise.allSettled([videoTask]);
    const failures = [
      ...imageResults
        .map((result, index) => ({ result, url: HOMEPAGE_IMAGE_URLS[index] }))
        .filter(({ result }) => result.status === 'rejected')
        .map(({ result, url }) => `${url}: ${(result as PromiseRejectedResult).reason}`),
      ...videoResult
        .filter((result) => result.status === 'rejected')
        .map((result) => `${SCROLL_VIDEO_URL}: ${(result as PromiseRejectedResult).reason}`),
    ];

    if (failures.length > 0) {
      throw new Error(`Failed to preload ${failures.length} homepage asset(s). ${failures.join(' | ')}`);
    }

    emitHomepageProgress(100);
  })().catch((error) => {
    homepagePreloadPromise = null;
    throw error;
  });

  return homepagePreloadPromise.finally(() => homepageProgressListeners.delete(onProgress));
};

export const detectVariant = (): Variant =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
    ? 'mobile'
    : 'desktop';

const frameUrl = (index: number) => `${FRAME_BASE}frame-${String(index).padStart(3, '0')}.webp`;

const getCache = async (): Promise<Cache | null> => {
  try {
    return typeof caches === 'undefined' ? null : await caches.open(CACHE_NAME);
  } catch {
    return null;
  }
};

async function fetchBytes(url: string, cache: Cache | null): Promise<ArrayBuffer> {
  try {
    const hit = await cache?.match(url);
    if (hit) return hit.arrayBuffer();
  } catch {
    // Private browsing can disable Cache Storage.
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Asset fetch failed: ${url}`);
  const bytes = await response.arrayBuffer();
  try {
    await cache?.put(url, new Response(bytes.slice(0)));
  } catch {
    // The in-memory bytes remain usable if the device has no cache quota.
  }
  return bytes;
}

const decodeBlob = (bytes: ArrayBuffer): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(new Blob([bytes], { type: 'image/webp' }));
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Frame decode failed'));
    };
    image.src = url;
  });

export const preloadLogo = async (): Promise<void> => {
  try {
    await new Promise<void>((resolve) => {
      const image = new Image();
      const timeout = window.setTimeout(resolve, 3000);
      image.onload = image.onerror = () => {
        window.clearTimeout(timeout);
        resolve();
      };
      image.src = LOGO_URL;
    });
  } catch {
    // The text lockup is still available if the logo is offline.
  }
};

class FrameStore {
  private manifest: FrameManifest | null = null;
  private cache: Cache | null = null;
  private buffers = new Map<number, ArrayBuffer>();
  private bufferTasks = new Map<number, Promise<ArrayBuffer>>();
  private images = new Map<number, HTMLImageElement>();
  private imageTasks = new Map<number, Promise<HTMLImageElement>>();
  private readyPromise: Promise<void> | null = null;
  zeroImg: HTMLImageElement | null = null;

  get flyTotal(): number {
    return this.manifest?.total ?? 0;
  }

  get frameSize(): { width: number; height: number } {
    return this.manifest
      ? { width: this.manifest.width, height: this.manifest.height }
      : { width: 1920, height: 1080 };
  }

  ensure(variant: Variant = 'desktop', onProgress: (fraction: number) => void = () => {}): Promise<void> {
    if (!this.readyPromise) {
      this.readyPromise = this.start(variant, onProgress).catch((error) => {
        this.readyPromise = null;
        throw error;
      });
    }
    return this.readyPromise;
  }

  private async start(variant: Variant, onProgress: (fraction: number) => void): Promise<void> {
    this.cache = await getCache();

    if (variant === 'mobile') {
      try {
        const [zeroBytes] = await Promise.all([
          fetchBytes(ZERO_URL, this.cache),
          ...HERO_URLS.map((url) => fetchBytes(url, this.cache).catch(() => null)),
        ]);
        if (zeroBytes) this.zeroImg = await decodeBlob(zeroBytes);
      } catch {
        /* non-fatal */
      }
      onProgress(1);
      return;
    }

    const response = await fetch(MANIFEST_URL);
    if (!response.ok) throw new Error('Flythrough manifest unavailable');
    this.manifest = (await response.json()) as FrameManifest;
    if (!this.manifest.total || this.manifest.width < 1 || this.manifest.height < 1) {
      throw new Error('Invalid flythrough manifest');
    }
    onProgress(0.08);

    const initial = Math.min(12, this.manifest.total);
    let fetched = 0;
    await Promise.all(Array.from({ length: initial }, (_, index) =>
      this.getBuffer(index).then(() => onProgress(0.08 + (++fetched / initial) * 0.67)),
    ));
    const openingFrame = this.ensureFrame(0);
    if (openingFrame) this.zeroImg = await openingFrame;
    await Promise.all(HERO_URLS.map((url) => fetchBytes(url, this.cache).catch(() => null)));
    onProgress(1);

    // Fetch compressed bytes while the visitor reads the opening sections.
    // Decoding stays limited to nearby frames to protect mobile memory.
    void this.prefetchRemaining(initial);
  }

  private async prefetchRemaining(start: number): Promise<void> {
    let next = start;
    const worker = async () => {
      while (next < this.flyTotal) {
        const index = next++;
        try {
          await this.getBuffer(index);
        } catch {
          // On-demand loading retries frames that failed in the background.
        }
      }
    };
    await Promise.all(Array.from({ length: 3 }, worker));
  }

  private getBuffer(index: number): Promise<ArrayBuffer> {
    if (index < 0 || index >= this.flyTotal) return Promise.reject(new Error('Frame out of range'));
    const existing = this.buffers.get(index);
    if (existing) return Promise.resolve(existing);
    const pending = this.bufferTasks.get(index);
    if (pending) return pending;
    const task = fetchBytes(frameUrl(index), this.cache)
      .then((bytes) => {
        this.bufferTasks.delete(index);
        this.buffers.set(index, bytes);
        return bytes;
      })
      .catch((error) => {
        this.bufferTasks.delete(index);
        throw error;
      });
    this.bufferTasks.set(index, task);
    return task;
  }

  ensureFrame(index: number): Promise<HTMLImageElement> | null {
    if (index < 0 || index >= this.flyTotal) return null;
    const image = this.images.get(index);
    if (image) return Promise.resolve(image);
    const pending = this.imageTasks.get(index);
    if (pending) return pending;
    const task = this.getBuffer(index)
      .then(decodeBlob)
      .then((decoded) => {
        this.imageTasks.delete(index);
        this.images.set(index, decoded);
        return decoded;
      })
      .catch((error) => {
        this.imageTasks.delete(index);
        throw error;
      });
    this.imageTasks.set(index, task);
    return task;
  }

  private evict(current: number): void {
    for (const [index, image] of this.images) {
      if (index !== 0 && Math.abs(index - current) > 5) {
        image.src = '';
        this.images.delete(index);
      }
    }
  }

  getSlice(frameIndex: number): Slice | null {
    if (frameIndex < 0 || frameIndex >= this.flyTotal || !this.manifest) return null;
    const image = this.images.get(frameIndex);
    if (!image) {
      void this.ensureFrame(frameIndex)?.catch(() => {});
      return null;
    }
    for (let offset = -2; offset <= 4; offset++) {
      if (offset !== 0) void this.ensureFrame(frameIndex + offset)?.catch(() => {});
    }
    this.evict(frameIndex);
    return { img: image, sx: 0, sy: 0, sw: this.manifest.width, sh: this.manifest.height };
  }
}

export const frameStore = new FrameStore();

export function drawFrameSlice(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  slice: Slice,
  containInUpperArea = false,
): void {
  const cw = canvas.width;
  const ch = canvas.height;
  if (!cw || !ch) return;
  ctx.fillStyle = containInUpperArea ? '#302923' : '#0a0a0b';
  ctx.fillRect(0, 0, cw, ch);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  const imageAreaHeight = containInUpperArea ? ch * 0.58 : ch;
  const scale = containInUpperArea
    ? Math.min(cw / slice.sw, imageAreaHeight / slice.sh)
    : Math.max(cw / slice.sw, ch / slice.sh);
  const width = slice.sw * scale;
  const height = slice.sh * scale;
  ctx.drawImage(slice.img, slice.sx, slice.sy, slice.sw, slice.sh,
    (cw - width) / 2, (imageAreaHeight - height) / 2, width, height);
}
