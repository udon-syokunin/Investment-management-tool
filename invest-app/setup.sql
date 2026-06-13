-- =====================================================
-- 投資ノートアプリ: Supabase テーブルセットアップSQL
-- Supabaseダッシュボードの「SQL Editor」で実行してください
-- =====================================================

-- ユーザーデータテーブル（1ユーザー1行）
CREATE TABLE IF NOT EXISTS user_data (
  user_id  UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  notes    JSONB DEFAULT '[]'::jsonb,
  learn    JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security（自分のデータしか見えない）
ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "自分のデータのみ操作可能"
  ON user_data
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
