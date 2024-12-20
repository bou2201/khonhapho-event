const canvasWidth = 2000;

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = () => resolve(image);
    image.onerror = reject;
  });

const drawInitialCanvas = (canvas: HTMLCanvasElement): Promise<void> =>
  new Promise(async (resolve, reject) => {
    const start = performance.now();
    try {
      const backgroundImage = await loadImage('/images/thu-moi.png');
      const width = canvasWidth;
      const height = (backgroundImage.height / backgroundImage.width) * width;
      canvas.width = width;
      canvas.height = height;
      console.log('Thời gian set kích thước canvas:', performance.now() - start);
      resolve();
    } catch (error) {
      reject('Lỗi tải ảnh nền');
      console.log(error);
    }
  });

const drawBackgroundCanvas = (ctx: CanvasRenderingContext2D): Promise<void> =>
  new Promise(async (resolve, reject) => {
    const start = performance.now();
    try {
      const backgroundImage = await loadImage('/images/thu-moi.png');
      const width = canvasWidth;
      const height = (backgroundImage.height / backgroundImage.width) * width;
      ctx.drawImage(backgroundImage, 0, 0, width, height);
      console.log('Thời gian vẽ nền:', performance.now() - start);
      resolve();
    } catch (error) {
      reject('Lỗi tải ảnh nền');
      console.log(error);
    }
  });

const drawAvatarCanvas = (ctx: CanvasRenderingContext2D, image?: File): Promise<void> =>
  new Promise(async (resolve, reject) => {
    const start = performance.now();
    try {
      if (!image) {
        const avatarImage = await loadImage('/images/avatar.jpg');
        const avatarX = (575 / 1000) * canvasWidth;
        const avatarY = (360 / 1000) * canvasWidth;
        const avatarWidth = (355 / 1000) * canvasWidth;
        const avatarHeight = (355 / 1000) * canvasWidth;
        ctx.drawImage(avatarImage, avatarX, avatarY, avatarWidth, avatarHeight);
        console.log('Thời gian vẽ avatar:', performance.now() - start);
        resolve();
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const avatarImage = new Image();
          avatarImage.onload = () => {
            const avatarX = (575 / 1000) * canvasWidth;
            const avatarY = (360 / 1000) * canvasWidth;
            const avatarWidth = (355 / 1000) * canvasWidth;
            const avatarHeight = (355 / 1000) * canvasWidth;
            ctx.drawImage(avatarImage, avatarX, avatarY, avatarWidth, avatarHeight);
            console.log('Thời gian vẽ avatar:', performance.now() - start);
            resolve();
          };
          avatarImage.src = e.target!.result as string;
        };

        reader.readAsDataURL(image);
      }
    } catch (error) {
      reject('Lỗi tải ảnh avatar');
      console.log(error);
    }
  });

const drawFullname = (ctx: CanvasRenderingContext2D, text?: string) => {
  ctx.font = `bold ${(34 / 1000) * canvasWidth}px Open Sans`;
  ctx.fillStyle = 'white';
  ctx.lineWidth = 5;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const x = (755 / 1000) * canvasWidth;
  const y = (705 / 1000) * canvasWidth;

  ctx.fillText(text ?? '', x, y);
};

const drawRole = (ctx: CanvasRenderingContext2D, text?: string) => {
  ctx.font = `bold ${(22 / 1000) * canvasWidth}px Open Sans`;
  ctx.fillStyle = '#FBD288';
  ctx.lineWidth = 5;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const x = (755 / 1000) * canvasWidth;
  const y = (668 / 1000) * canvasWidth;

  ctx.fillText(text?.toUpperCase() ?? '', x, y);
};

export { drawAvatarCanvas, drawBackgroundCanvas, drawFullname, drawInitialCanvas, drawRole };
