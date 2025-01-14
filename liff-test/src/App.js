import React, { useState } from 'react';
import useLiff from './hooks/useLiff';

// LIFF IDを設定(後述)
const liffId = '2006770067-9yLG6E0P';

function App() {
  const { loading, error, profile, fetchProfile, sendMessage } = useLiff({ liffId });
  const [toushi, setToushi] = useState('');
  const [kaisyu, setKaisyu] = useState('');
  const [syushi, setSyushi] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'toushi') {
      setToushi(value);
    } else if (name === 'kaisyu') {
      setKaisyu(value);
    } else if (name === 'syushi') {
      setSyushi(value);
    }
  };

  const modifySendMessage = () => {
    return "投資: ${toushi}\n 回収: ${kaisyu}\n 収支: ${syushi}";
  }

  if (loading) return <p>...loading</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      {/* 追加 */}
      <section>
        {/* ボタンをクリックしたらfetchProfileを実行 */}
        <button onClick={() => modifySendMessage()}>投稿</button>
        {/* 取得したProfileを表示 */}
        {profile && (
          <div>
            <p>DisplayName: {profile.displayName}</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;

