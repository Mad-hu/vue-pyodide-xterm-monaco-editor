import matplotlib
import numpy as np
matplotlib.use("module://matplotlib_pyodide.html5_canvas_backend")
import matplotlib.cm as cm
from matplotlib import pyplot as plt
delta = 0.025
x = y = np.arange(-3.0, 3.0, delta)
X, Y = np.meshgrid(x, y)
Z1 = np.exp(-(X**2) - Y**2)
Z2 = np.exp(-((X - 1) ** 2) - (Y - 1) ** 2)
Z = (Z1 - Z2) * 2
plt.figure(figsize=(5, 4.1))
plt.imshow(
Z,
interpolation="bilinear",
cmap=cm.RdYlGn,
origin="lower",
extent=[-3, 3, -3, 3],
vmax=abs(Z).max(),
vmin=-abs(Z).max(),
)


async def main():
    plt.show()
    
async def stop():
    print("Stopped")