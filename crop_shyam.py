from PIL import Image

def crop_top_square(path):
    try:
        img = Image.open(path)
        width, height = img.size
        print(f"Processing {path} ({width}x{height})")
        
        if width == height:
            print("Already square.")
            return

        min_dim = min(width, height)
        
        if width < height: # Portrait
            # Top crop
            left = 0
            upper = 0
            right = width
            lower = width
            print("Cropping Portrait (Top)")
        else: # Landscape
            # Center crop
            left = (width - height) // 2
            upper = 0
            right = left + height
            lower = height
            print("Cropping Landscape (Center)")

        img_cropped = img.crop((left, upper, right, lower))
        img_cropped.save(path)
        print(f"Saved cropped image to {path}")

    except Exception as e:
        print(f"Error processing {path}: {e}")

crop_top_square('src/assets/shyamsundardoctor.jpeg')
