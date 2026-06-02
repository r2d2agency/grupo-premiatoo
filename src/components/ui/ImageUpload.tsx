import { useState, useRef } from "react";
import { Button } from "./button";
import { Upload, X, ImageIcon, Smartphone, Tablet, Monitor } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  type?: 'desktop' | 'tablet' | 'mobile';
}

/**
 * Compresses and converts an image to WebP format using Canvas API.
 */
async function processImage(file: File, maxWidth = 1920): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Resize if necessary
        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert to WebP with 0.8 quality
        const webpBase64 = canvas.toDataURL("image/webp", 0.8);
        resolve(webpBase64);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

export function ImageUpload({ value, onChange, label, type }: ImageUploadProps) {
  const [preview, setPreview] = useState(value);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      // Determine max width based on type
      let maxWidth = 1920;
      if (type === 'tablet') maxWidth = 1024;
      if (type === 'mobile') maxWidth = 768;

      const webpBase64 = await processImage(file, maxWidth);
      
      // Check size (base64 is ~33% larger than binary)
      // 1.2MB base64 is roughly 900KB binary
      if (webpBase64.length > 1.2 * 1024 * 1024) { 
        toast.error("A imagem processada ainda está muito grande. Tente uma imagem menor.");
        setIsProcessing(false);
        return;
      }

      setPreview(webpBase64);
      onChange(webpBase64);
      toast.success("Imagem otimizada (WebP) com sucesso!");
    } catch (error) {
      console.error("Image processing error:", error);
      toast.error("Erro ao processar imagem.");
    } finally {
      setIsProcessing(false);
    }
  };

  const clearImage = () => {
    setPreview("");
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const TypeIcon = () => {
    if (type === 'mobile') return <Smartphone className="h-4 w-4 mr-2 text-muted-foreground" />;
    if (type === 'tablet') return <Tablet className="h-4 w-4 mr-2 text-muted-foreground" />;
    if (type === 'desktop') return <Monitor className="h-4 w-4 mr-2 text-muted-foreground" />;
    return null;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center">
        <TypeIcon />
        {label && <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>}
      </div>
      <div className="flex flex-col gap-4">
        {preview ? (
          <div className="relative group aspect-video w-full rounded-md overflow-hidden border bg-muted/20">
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => fileInputRef.current?.click()}
                className="h-8 rounded-full"
                disabled={isProcessing}
              >
                Alterar
              </Button>
              <Button 
                variant="destructive" 
                size="icon" 
                onClick={clearImage}
                className="h-8 w-8 rounded-full"
                disabled={isProcessing}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="flex flex-col items-center justify-center gap-2 aspect-video w-full rounded-md border-2 border-dashed border-muted-foreground/25 hover:border-navy/50 hover:bg-navy/5 transition-colors disabled:opacity-50"
          >
            <div className="p-2 rounded-full bg-muted">
              {isProcessing ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-navy"></div>
              ) : (
                <ImageIcon className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              {isProcessing ? "Otimizando..." : "Clique para subir"}
            </div>
            <div className="text-[10px] text-muted-foreground/60 uppercase">WebP Auto-conversion</div>
          </button>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
}
