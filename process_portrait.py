import os
import sys
from PIL import Image
from rembg import remove

input_path = r"C:\Users\jha\.gemini\antigravity\scratch\suvradip-portfolio\public\images\suvradip-real.jpg"
output_png = r"C:\Users\jha\.gemini\antigravity\scratch\suvradip-portfolio\public\images\suvradip-cutout.png"
output_dark = r"C:\Users\jha\.gemini\antigravity\scratch\suvradip-portfolio\public\images\suvradip-dark.jpg"

print("Reading input image:", input_path)
input_img = Image.open(input_path)

print("Removing background with rembg...")
cutout = remove(input_img)
cutout.save(output_png, "PNG")
print("Saved transparent cutout to:", output_png)

# Create deep dark navy composited version (#0a0c16)
bg = Image.new("RGBA", cutout.size, (10, 12, 22, 255))
composited = Image.alpha_composite(bg, cutout)
composited.convert("RGB").save(output_dark, "JPEG", quality=95)
print("Saved dark-background portrait to:", output_dark)

# Also update suvradip-portrait.jpg with the dark version so any legacy reference gets the dark background
composited.convert("RGB").save(r"C:\Users\jha\.gemini\antigravity\scratch\suvradip-portfolio\public\images\suvradip-portrait.jpg", "JPEG", quality=95)
print("Updated suvradip-portrait.jpg")
