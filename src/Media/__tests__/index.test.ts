import {Media} from '..';

const createMedia = () => new Media<any, any, any>({}, {});

describe('<Media>', () => {
  describe('play lock', () => {
    it('not locked by default', () => {
      const media = createMedia();

      expect(media.lockPlay).toBe(false);
    });

    it('calls DOM element play', () => {
      const media = createMedia();
      media.el = {
        play: jest.fn()
      } as any;

      media.play();

      expect(media.el.play).toHaveBeenCalledTimes(1);
    });

    it('locks play() on call', () => {
      const media = createMedia();
      const play = jest.fn();
      const pause = jest.fn();

      play.mockImplementation(() => Promise.resolve(null));

      media.el = {
        play,
        pause
      } as any;

      expect(media.lockPlay).toBe(false);

      media.play();

      expect(media.lockPlay).toBe(true);

      media.play();
      media.play();

      media.pause();
      media.pause();

      expect(play).toHaveBeenCalledTimes(1);
      expect(pause).toHaveBeenCalledTimes(0);
    });

    it('unlocks play() when promise resolves', () => {
      const media = createMedia();
      const play = jest.fn();
      const pause = jest.fn();

      play.mockImplementation(() => Promise.resolve(null));

      media.el = {
        play,
        pause
      } as any;

      media.play();
      media.play();
      media.pause();

      expect(play).toHaveBeenCalledTimes(1);
      expect(pause).toHaveBeenCalledTimes(0);

      return new Promise((resolve, reject) => {
        setImmediate(() => {
          try {
            media.pause();
            media.play();

            expect(play).toHaveBeenCalledTimes(2);
            expect(pause).toHaveBeenCalledTimes(1);

            resolve();
          } catch (error) {
            reject(error);
          }
        });
      });
    });
  });
});
