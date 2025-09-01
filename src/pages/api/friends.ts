import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const GET: APIRoute = async () => {
  try {
    const friendsPath = path.join(process.cwd(), 'src/data/friends.json');
    const friendsData = await fs.readFile(friendsPath, 'utf-8');
    const friends = JSON.parse(friendsData);

    return new Response(JSON.stringify(friends), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    console.error('获取友情链接失败:', error);
    return new Response(JSON.stringify({
      error: '获取友情链接失败',
      friends: []
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
    const friendsPath = path.join(process.cwd(), 'src/data/friends.json');
    
    // 更新友情链接数据
    await fs.writeFile(friendsPath, JSON.stringify(body, null, 2), 'utf-8');

    return new Response(JSON.stringify({
      success: true,
      message: '友情链接更新成功'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('更新友情链接失败:', error);
    return new Response(JSON.stringify({
      error: '更新友情链接失败'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
