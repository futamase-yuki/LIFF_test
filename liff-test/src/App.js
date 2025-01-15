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

  function formatResult(result) {
    const isNegative = result < 0;
    const absoluteValue = Math.abs(result);
    const formattedAbsoluteValue = absoluteValue.toLocaleString('en-US', {
      minimumIntegerDigits: isNegative ? 4 : 5, // マイナス用には一桁少なくする
      useGrouping: false,
    });
  
    const formattedResult = isNegative
      ? `-${formattedAbsoluteValue}`
      : ` ${formattedAbsoluteValue}`; // プラスの場合スペースを入れて調整
  
    return `${formattedResult}`;
  }

  {/* 取得したProfile profile.displayNameで取得*/}
  const modifySendMessage = () => {
    // もし machine が空でないなら、machine の値を含める
    if (machine) {
      return `機種: ${machine}\n投資:${formatResult(toushi)}\n回収:${formatResult(kaisyu)}\n収支:${formatResult(syushi)}`;
    }
    else {
      return `投資: ${formatResult(toushi)}\n回収: ${formatResult(kaisyu)}\n収支: ${formatResult(syushi)}`;
    }
  }

  const onClickSubmitButton = async () => {
    await sendMessage({ text: modifySendMessage() });
    exitLiff();
  }

  if (loading) return <p>...loading</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <section>
            <div class="form-row align-items-center">
              <label class="form-group col-2">機種</label>
              <div class="form-group col-8">
                <input class="form-control mt-0" type="text" name="machine" placeholder="" onChange={handleInputChange}/>
              </div>
            </div>

            <div class="form-row align-items-center">
              <label class="form-group col-2">投資</label>
              <div class="form-group col-7">
                  <input class="form-control mt-0" type="number" name="toushi" required onChange={handleInputChange}/>
              </div>
              <div class="form-group col-3">
                <select id="inputState" class="form-control mt-0">
                  <option selected>円</option>
                  <option>枚</option>
                  <option>玉</option>
                </select>
              </div>
            </div>

            <div class="form-row align-items-center">
              <label class="form-group col-2">回収</label>
              <div class="form-group col-7">
                <input class="form-control mt-1" type="number" name="kaisyu" required onChange={handleInputChange}/>
              </div>
              <div class="form-group col-3">
                <select id="inputState" class="form-control mt-1">
                  <option selected>k円</option>
                  <option>枚</option>
                  <option>玉</option>
                </select>
              </div>
            </div>

            <div class="form-row align-items-center">
              <label class="form-group col-2">収支</label>
              <div class="form-group col-7">
                <input class="form-control mt-1" type="number" name="syushi" required onChange={handleInputChange}/>
              </div>
              <div class="form-group col-3">
                <select id="inputState" class="form-control mt-1">
                  <option selected>円</option>
                  <option>枚</option>
                  <option>玉</option>
                </select>
              </div>
            </div>

            <p></p>
            <button type="submit" class="btn btn-primary pull-right" onClick={() => onClickSubmitButton() }>投稿</button>
      </section>
    </div>
  );
}

export default App;

