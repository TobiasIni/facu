-- Tabla para gestionar videos de TikTok
CREATE TABLE IF NOT EXISTS tiktok_videos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  video_id VARCHAR(100) NOT NULL UNIQUE,
  author_handle VARCHAR(100) NOT NULL DEFAULT 'facureino',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tiktok_videos_updated_at
BEFORE UPDATE ON tiktok_videos
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) - Solo administradores autenticados pueden gestionar
ALTER TABLE tiktok_videos ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura a todos (para mostrar videos en el frontend)
CREATE POLICY "Allow public read access to tiktok_videos" ON tiktok_videos
FOR SELECT USING (true);

-- Política para permitir inserción solo a usuarios autenticados
CREATE POLICY "Allow authenticated insert to tiktok_videos" ON tiktok_videos
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Política para permitir actualización solo a usuarios autenticados
CREATE POLICY "Allow authenticated update to tiktok_videos" ON tiktok_videos
FOR UPDATE USING (auth.role() = 'authenticated');

-- Política para permitir eliminación solo a usuarios autenticados
CREATE POLICY "Allow authenticated delete to tiktok_videos" ON tiktok_videos
FOR DELETE USING (auth.role() = 'authenticated');

-- Comentarios para documentación
COMMENT ON TABLE tiktok_videos IS 'Tabla para gestionar los videos de TikTok que aparecen en la galería del sitio web';
COMMENT ON COLUMN tiktok_videos.title IS 'Título descriptivo del video que aparece en la card';
COMMENT ON COLUMN tiktok_videos.video_id IS 'ID único del video de TikTok extraído de la URL';
COMMENT ON COLUMN tiktok_videos.author_handle IS 'Handle del autor del video (por defecto facureino)'; 