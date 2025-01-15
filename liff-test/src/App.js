import React, { useState } from 'react';
import useLiff from './hooks/useLiff';

// LIFF IDを設定(後述)
const liffId = '2006770067-9yLG6E0P';

function App() {
  const { exitLiff, loading, error, profile, fetchProfile, sendMessage } = useLiff({ liffId });
  const [machine, setMachine] = useState('');
  const [toushi, setToushi] = useState('');
  const [kaisyu, setKaisyu] = useState('');
  const [syushi, setSyushi] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'machine') {
      setMachine(value);
    } else if (name === 'toushi') {
      setToushi(value);
    } else if (name === 'kaisyu') {
      setKaisyu(value);
    } else if (name === 'syushi') {
      setSyushi(value);
    }
  };

  const modifySendMessage = () => {
    // もし machine が空でないなら、machine の値を含める
    if (machine) {
      return `機種: ${machine}\n投資: ${toushi}\n回収: ${kaisyu}\n収支: ${syushi}`;
    }
    else {
      return `投資: ${toushi}\n回収: ${kaisyu}\n収支: ${syushi}`;
    }
  }

  const onClickSubmitButton = () => {
    sendMessage({ text: modifySendMessage() });
    exitLiff();
  }

  if (loading) return <p>...loading</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      {/* 追加 */}
      <section>
        {/* ボタンをクリックしたらfetchProfileを実行 */}
            <p class="mt-3">機種</p>
            <div>
                <input class="form-control w-100 mt-1" name="machine" placeholder="" onChange={handleInputChange}/>
            </div>
            <p class="mt-3">投資</p>
            <div>
                <input class="form-control w-100 mt-1" name="toushi" required onChange={handleInputChange}/>
            </div>
            <p class="mt-3">回収</p>
            <div>
                <input class="form-control w-100 mt-1" name="kaisyu" required onChange={handleInputChange}/>
            </div>
            <p class="mt-3">収支</p>
            <div>
                <input class="form-control w-100 mt-1" name="syushi" required onChange={handleInputChange}/>
            </div>
            <button type="submit" class="btn btn-primary" onClick={() => onClickSubmitButton() }>投稿</button>
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

