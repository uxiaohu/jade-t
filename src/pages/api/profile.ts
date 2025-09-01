import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const GET: APIRoute = async () => {
  try {
    const profilePath = path.join(process.cwd(), 'src/data/profile.json');
    const profileData = await fs.readFile(profilePath, 'utf-8');
    const profile = JSON.parse(profileData);

    return new Response(JSON.stringify(profile), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    console.error('获取个人资料失败:', error);
    return new Response(JSON.stringify({
      error: '获取个人资料失败',
      name: '',
      avatar: '',
      bio: '',
      email: '',
      github: '',
      weibo: '',
      qq: '',
      wechat: ''
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
    const profilePath = path.join(process.cwd(), 'src/data/profile.json');
    
    // 更新个人资料数据
    await fs.writeFile(profilePath, JSON.stringify(body, null, 2), 'utf-8');

    return new Response(JSON.stringify({
      success: true,
      message: '个人资料更新成功'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('更新个人资料失败:', error);
    return new Response(JSON.stringify({
      error: '更新个人资料失败'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
