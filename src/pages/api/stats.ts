import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'fs/promises';
import path from 'path';

export const GET: APIRoute = async () => {
  try {
    // 获取文章数量
    const posts = await getCollection('blog');
    const totalPosts = posts.length;

    // 获取友情链接数量
    const friendsPath = path.join(process.cwd(), 'src/data/friends.json');
    let totalFriends = 0;
    try {
      const friendsData = await fs.readFile(friendsPath, 'utf-8');
      const friends = JSON.parse(friendsData);
      totalFriends = friends.friends?.length || 0;
    } catch (error) {
      console.error('读取友情链接失败:', error);
    }

    // 模拟访问量和评论数（实际项目中应该从数据库获取）
    const totalViews = Math.floor(Math.random() * 5000) + 1000;
    const totalComments = Math.floor(Math.random() * 100) + 20;

    const stats = {
      totalPosts,
      totalViews,
      totalComments,
      totalFriends,
      lastUpdated: new Date().toISOString()
    };

    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    console.error('获取统计数据失败:', error);
    return new Response(JSON.stringify({
      error: '获取统计数据失败',
      totalPosts: 0,
      totalViews: 0,
      totalComments: 0,
      totalFriends: 0
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
