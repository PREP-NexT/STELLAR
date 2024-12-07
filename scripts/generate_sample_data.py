import numpy as np
import json
import os

# 创建数据目录
os.makedirs('src/data/spatial/landuse', exist_ok=True)
os.makedirs('src/data/spatial/groundwater', exist_ok=True)

# 生成示例数据
num_years = 10
grid_size = 50

# 生成时间序列数据
time_series = []
for year in range(num_years):
    time_series.append({
        "year": year,
        "groundwaterChange": float(np.sin(year/3) * 0.05 - 0.02),  # 模拟地下水变化
        "revenue": float(90 - year * 3 + np.random.normal(0, 5))    # 模拟收益变化
    })

# 保存时间序列数据
with open('src/data/timeseries.json', 'w') as f:
    json.dump(time_series, f)

# 生成空间数据
for year in range(num_years):
    # 生成土地利用数据 (0: 农田, 1: 湿地, 2: 其他)
    landuse = np.zeros((grid_size, grid_size))
    # 添加一些随机湿地
    wetland_mask = np.random.random((grid_size, grid_size)) < (0.2 + year * 0.03)
    landuse[wetland_mask] = 1
    
    # 生成地下水数据
    groundwater = np.zeros((grid_size, grid_size))
    # 添加一些空间相关的随机变化
    x, y = np.meshgrid(np.linspace(-2, 2, grid_size), np.linspace(-2, 2, grid_size))
    groundwater = np.exp(-(x**2 + y**2)/4) + np.random.normal(0, 0.1, (grid_size, grid_size))
    
    # 保存数据
    np.save(f'src/data/spatial/landuse/year{year}.npy', landuse)
    np.save(f'src/data/spatial/groundwater/year{year}.npy', groundwater)

print("Sample data generated successfully!") 