export async function loadNpyFile(path: string) {
  try {
    const response = await fetch(path);
    const buffer = await response.arrayBuffer();
    const data = new Float32Array(buffer);
    // 重塑为 52x48 的矩阵
    const result = [];
    for (let i = 0; i < 52; i++) {
      const row = [];
      for (let j = 0; j < 48; j++) {
        row.push(data[i * 48 + j]);
      }
      result.push(row);
    }
    return result;
  } catch (error) {
    console.error('Error loading NPY file:', error);
    return Array(52).fill(Array(48).fill(0));
  }
} 