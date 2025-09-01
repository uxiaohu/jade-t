import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const GET: APIRoute = async () => {
  try {
    const configPath = path.join(process.cwd(), 'src/data/config.json');
    const configData = await fs.readFile(configPath, 'utf-8');
    const config = JSON.parse(configData);

    return new Response(JSON.stringify(config), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    console.error('获取网站配置失败:', error);
    return new Response(JSON.stringify({
      error: '获取网站配置失败',
      title: '',
      description: '',
      keywords: [],
      author: '',
      favicon: '',
      logo: '',
      icp: '',
      analytics: ''
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const configPath = path.join(process.cwd(), 'src/data/config.json');
    
    // 更新网站配置数据
    await fs.writeFile(configPath, JSON.stringify(body, null, 2), 'utf-8');

    return new Response(JSON.stringify({
      success: true,
      message: '网站配置更新成功'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('更新网站配置失败:', error);
    return new Response(JSON.stringify({
      error: '更新网站配置失败'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
