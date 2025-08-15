// Utility to download images and create zip files for Facebook ad creatives
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export interface ProductImages {
  productImages: string[];
  reviewImages: string[];
}

// Helper function to fetch image as blob
async function fetchImageAsBlob(url: string): Promise<{ blob: Blob; filename: string } | null> {
  try {
    // Handle different types of image URLs
    let imageUrl = url;
    let filename = '';
    
    // Handle data URLs
    if (url.startsWith('data:')) {
      const response = await fetch(url);
      const blob = await response.blob();
      const extension = blob.type.split('/')[1] || 'jpg';
      filename = `image_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${extension}`;
      return { blob, filename };
    }
    
    // Handle blob URLs
    if (url.startsWith('blob:')) {
      const response = await fetch(url);
      const blob = await response.blob();
      const extension = blob.type.split('/')[1] || 'jpg';
      filename = `image_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${extension}`;
      return { blob, filename };
    }
    
    // Handle regular URLs
    if (url.startsWith('http://') || url.startsWith('https://')) {
      // Extract filename from URL or generate one
      const urlParts = url.split('/');
      const lastPart = urlParts[urlParts.length - 1];
      const queryIndex = lastPart.indexOf('?');
      filename = queryIndex > -1 ? lastPart.substring(0, queryIndex) : lastPart;
      
      // If filename doesn't have an extension, add one
      if (!filename.includes('.')) {
        filename = `${filename}.jpg`;
      }
      
      // Sanitize filename
      filename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
      
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const blob = await response.blob();
        return { blob, filename };
      } catch (error) {
        // If CORS fails, try proxying through a function
        console.warn('Direct fetch failed, trying proxy:', error);
        // For now, skip CORS-blocked images
        return null;
      }
    }
    
    // Handle relative URLs
    if (url.startsWith('/')) {
      imageUrl = `${window.location.origin}${url}`;
      filename = url.split('/').pop() || 'image.jpg';
      filename = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
      
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return { blob, filename };
    }
    
    console.warn('Unsupported image URL format:', url);
    return null;
  } catch (error) {
    console.error('Error fetching image:', url, error);
    return null;
  }
}

// Main function to download images as zip
export async function downloadProductCreatives(
  productName: string,
  images: ProductImages,
  onProgress?: (progress: number) => void
): Promise<void> {
  const zip = new JSZip();
  const productFolder = zip.folder('Product Images');
  const reviewFolder = zip.folder('Review Images');
  
  if (!productFolder || !reviewFolder) {
    throw new Error('Failed to create folders in zip');
  }
  
  const totalImages = images.productImages.length + images.reviewImages.length;
  let processedImages = 0;
  
  // Process product images
  for (let i = 0; i < images.productImages.length; i++) {
    const imageUrl = images.productImages[i];
    const result = await fetchImageAsBlob(imageUrl);
    
    if (result) {
      const { blob, filename } = result;
      const finalFilename = `product_${i + 1}_${filename}`;
      productFolder.file(finalFilename, blob);
    }
    
    processedImages++;
    if (onProgress) {
      onProgress((processedImages / totalImages) * 100);
    }
  }
  
  // Process review images
  for (let i = 0; i < images.reviewImages.length; i++) {
    const imageUrl = images.reviewImages[i];
    const result = await fetchImageAsBlob(imageUrl);
    
    if (result) {
      const { blob, filename } = result;
      const finalFilename = `review_${i + 1}_${filename}`;
      reviewFolder.file(finalFilename, blob);
    }
    
    processedImages++;
    if (onProgress) {
      onProgress((processedImages / totalImages) * 100);
    }
  }
  
  // Generate zip file
  const content = await zip.generateAsync({ type: 'blob' });
  
  // Create filename for zip
  const sanitizedProductName = productName
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, 50);
  const zipFilename = `${sanitizedProductName}_creatives_${Date.now()}.zip`;
  
  // Save the zip file
  saveAs(content, zipFilename);
}

// Function to download a single image
export async function downloadSingleImage(imageUrl: string, filename?: string): Promise<void> {
  const result = await fetchImageAsBlob(imageUrl);
  
  if (result) {
    const { blob, filename: generatedFilename } = result;
    saveAs(blob, filename || generatedFilename);
  } else {
    throw new Error('Failed to download image');
  }
}
