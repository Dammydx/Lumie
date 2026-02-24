import { useState } from 'react'
import { supabase } from '../../config/supabase'

export default function ImageUpload({ bucket = 'product-images', onUpload }: any) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  async function handleUpload() {
    if (!file) return
    setUploading(true)
    const path = `${Date.now()}_${file.name}`
    try {
      const { data: uploadData, error } = await supabase.storage.from(bucket).upload(path, file)
      if (error) throw error
      const publicRes = supabase.storage.from(bucket).getPublicUrl(uploadData.path)
      const publicUrl = publicRes?.data?.publicUrl || ''
      onUpload && onUpload(publicUrl)
    } catch (err) {
      console.error('Upload error', err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      <div>
        <button disabled={!file || uploading} onClick={handleUpload} className="px-3 py-2 bg-purple-600 text-white rounded">{uploading ? 'Uploading...' : 'Upload'}</button>
      </div>
    </div>
  )
}
