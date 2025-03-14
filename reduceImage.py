import os
from PIL import Image

input_directory = "./assets/Award/"
output_directory = "./assets/resizedAward/"

if not os.path.exists(output_directory):
    os.makedirs(output_directory)

target_size = (800, 800)
quality = 85

def resize_and_compress_image(input_path, output_path):
    with Image.open(input_path) as img:
        img.thumbnail(target_size, Image.LANCZOS)
        img.save(output_path, "JPEG", quality=quality)

for filename in os.listdir(input_directory):
    input_path = os.path.join(input_directory, filename)
    output_path = os.path.join(output_directory, filename)
    resize_and_compress_image(input_path, output_path)
    print(f"Processed {filename}")
