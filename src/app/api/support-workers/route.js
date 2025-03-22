// 从环境变量获取 Supabase URL 和 anon key
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function GET() {
  try {
    // 发送请求到 Supabase REST API
    const response = await fetch(`${SUPABASE_URL}/rest/v1/support_workers`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      // 如果响应不是 2xx，抛出错误
      throw new Error(`Error fetching support workers: ${response.statusText}`);
    }

    // 获取数据
    const supportWorkers = await response.json();

    // 返回成功响应
    return Response.json(supportWorkers);

  } catch (error) {
    // 返回错误响应
    console.error('Error in support workers API:', error);
    return Response.json(
      { error: 'Failed to fetch support workers' },
      { status: 500 }
    );
  }
} 