// 后台管理API
class AdminAPI {
  constructor() {
    this.baseURL = '/api';
  }

  // 获取统计数据
  async getStats() {
    try {
      const response = await fetch(`${this.baseURL}/stats`);
      return await response.json();
    } catch (error) {
      console.error('获取统计数据失败:', error);
      return {
        totalPosts: 0,
        totalViews: 0,
        totalComments: 0,
        totalFriends: 0
      };
    }
  }

  // 获取文章列表
  async getPosts() {
    try {
      const response = await fetch(`${this.baseURL}/posts`);
      return await response.json();
    } catch (error) {
      console.error('获取文章列表失败:', error);
      return [];
    }
  }

  // 创建文章
  async createPost(postData) {
    try {
      const response = await fetch(`${this.baseURL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });
      return await response.json();
    } catch (error) {
      console.error('创建文章失败:', error);
      throw error;
    }
  }

  // 更新文章
  async updatePost(id, postData) {
    try {
      const response = await fetch(`${this.baseURL}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });
      return await response.json();
    } catch (error) {
      console.error('更新文章失败:', error);
      throw error;
    }
  }

  // 删除文章
  async deletePost(id) {
    try {
      const response = await fetch(`${this.baseURL}/posts/${id}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (error) {
      console.error('删除文章失败:', error);
      throw error;
    }
  }

  // 获取友情链接
  async getFriends() {
    try {
      const response = await fetch(`${this.baseURL}/friends`);
      return await response.json();
    } catch (error) {
      console.error('获取友情链接失败:', error);
      return [];
    }
  }

  // 更新友情链接
  async updateFriends(friendsData) {
    try {
      const response = await fetch(`${this.baseURL}/friends`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(friendsData)
      });
      return await response.json();
    } catch (error) {
      console.error('更新友情链接失败:', error);
      throw error;
    }
  }

  // 获取说说动态
  async getTalking() {
    try {
      const response = await fetch(`${this.baseURL}/talking`);
      return await response.json();
    } catch (error) {
      console.error('获取说说动态失败:', error);
      return [];
    }
  }

  // 更新说说动态
  async updateTalking(talkingData) {
    try {
      const response = await fetch(`${this.baseURL}/talking`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(talkingData)
      });
      return await response.json();
    } catch (error) {
      console.error('更新说说动态失败:', error);
      throw error;
    }
  }

  // 获取个人资料
  async getProfile() {
    try {
      const response = await fetch(`${this.baseURL}/profile`);
      return await response.json();
    } catch (error) {
      console.error('获取个人资料失败:', error);
      return {};
    }
  }

  // 更新个人资料
  async updateProfile(profileData) {
    try {
      const response = await fetch(`${this.baseURL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData)
      });
      return await response.json();
    } catch (error) {
      console.error('更新个人资料失败:', error);
      throw error;
    }
  }

  // 获取网站配置
  async getConfig() {
    try {
      const response = await fetch(`${this.baseURL}/config`);
      return await response.json();
    } catch (error) {
      console.error('获取网站配置失败:', error);
      return {};
    }
  }

  // 更新网站配置
  async updateConfig(configData) {
    try {
      const response = await fetch(`${this.baseURL}/config`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(configData)
      });
      return await response.json();
    } catch (error) {
      console.error('更新网站配置失败:', error);
      throw error;
    }
  }

  // 上传文件
  async uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${this.baseURL}/upload`, {
        method: 'POST',
        body: formData
      });
      return await response.json();
    } catch (error) {
      console.error('上传文件失败:', error);
      throw error;
    }
  }

  // 获取访问统计
  async getAnalytics() {
    try {
      const response = await fetch(`${this.baseURL}/analytics`);
      return await response.json();
    } catch (error) {
      console.error('获取访问统计失败:', error);
      return {
        pageViews: [],
        visitors: [],
        topPages: [],
        referrers: []
      };
    }
  }
}

// 导出API实例
window.AdminAPI = AdminAPI;
