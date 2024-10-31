import asyncio
import pygame, os

IMG_DIR = os.path.dirname(__file__)
def load_png(file, directory, scale, convert_alpha=False):
    try:
        path = os.path.join(directory, file)
        if not convert_alpha:
            img = pygame.image.load(path).convert_alpha()
        else:
            img = pygame.image.load(path).convert()
            transColor = img.get_at((0,0))
            img.set_colorkey(transColor)
        img_w = img.get_width()
        img_h = img.get_height()
        img = pygame.transform.scale(img, (img_w*scale, img_h*scale))
        return img
    except Exception as e:
        print(e)
        exit()
async def main():
    pygame.init()
    screen = pygame.display.set_mode((300, 300), pygame.SCALED)
    pygame.display.set_caption("Monkey Fever")
    pygame.mouse.set_visible(False)
    # Create The Background
    background = load_png("gem.png", IMG_DIR, 2)
    screen.blit(background, (0, 0))
    pygame.display.flip()
    # Display The Background

asyncio.ensure_future(main())