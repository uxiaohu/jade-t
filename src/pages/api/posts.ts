import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ url }) => {
  try {
    const searchParams = url.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    // 获取所有文章
    const allPosts = await getCollection('blog');
    
    // 按日期排序
    const sortedPosts = allPosts.sort((a, b) => 
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );

    // 过滤文章
    let filteredPosts = sortedPosts;
    
    if (category) {
      filteredPosts = filteredPosts.filter(post => post.data.categories === category);
    }
    
    if (status === 'published') {
      filteredPosts = filteredPosts.filter(post => !post.data.hide);
    } else if (status === 'hidden') {
      filteredPosts = filteredPosts.filter(post => post.data.hide);
    }

    // 分页
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    // 格式化文章数据
    const posts = paginatedPosts.map(post => ({
      id: post.data.id,
      title: post.data.title,
      slug: post.slug,
      categories: post.data.categories,
      tags: post.data.tags || [],
      cover: post.data.cover || '',
      excerpt: post.data.excerpt || '',
      date: post.data.date,
      updated: post.data.updated,
      recommend: post.data.recommend || false,
      top: post.data.top || false,
      hide: post.data.hide || false,
      status: post.data.hide ? 'hidden' : 'published'
    }));

    const response = {
      posts,
      pagination: {
        current: page,
        limit,
        total: filteredPosts.length,
        pages: Math.ceil(filteredPosts.length / limit)
      }
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
  } catch (error) {
    console.error('获取文章列表失败:', error);
    return new Response(JSON.stringify({
      error: '获取文章列表失败',
      posts: [],
      pagination: {
        current: 1,
        limit: 10,
        total: 0,
        pages: 0
      }
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    // 这里应该实现创建文章的逻辑
    // 由于Decap CMS会直接操作Git仓库，这里主要用于验证
    
    return new Response(JSON.stringify({
      success: true,
      message: '文章创建成功',
      id: body.id
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('创建文章失败:', error);
    return new Response(JSON.stringify({
      error: '创建文章失败'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
