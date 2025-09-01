import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const GET: APIRoute = async () => {
  try {
    const talkingPath = path.join(process.cwd(), 'src/data/talking.json');
    const talkingData = await fs.readFile(talkingPath, 'utf-8');
    const talking = JSON.parse(talkingData);

    return new Response(JSON.stringify(talking), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    console.error('获取说说动态失败:', error);
    return new Response(JSON.stringify({
      error: '获取说说动态失败',
      talking: []
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
    const talkingPath = path.join(process.cwd(), 'src/data/talking.json');
    
    // 更新说说动态数据
    await fs.writeFile(talkingPath, JSON.stringify(body, null, 2), 'utf-8');

    return new Response(JSON.stringify({
      success: true,
      message: '说说动态更新成功'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('更新说说动态失败:', error);
    return new Response(JSON.stringify({
      error: '更新说说动态失败'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
