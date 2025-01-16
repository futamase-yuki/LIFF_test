import React, { useState } from 'react';
import useLiff from './hooks/useLiff';

// LIFF IDを設定
const liffId = '2006770067-9yLG6E0P';

function App() {
  const { exitLiff, loading, error, profile, fetchProfile, sendMessage } = useLiff({ liffId });
  const [machine, setMachine] = useState('');
  const [toushi, setToushi] = useState('');
  const [kaisyu, setKaisyu] = useState('');
  const [syushi, setSyushi] = useState('');
  const [isSyushiEditable, setIsSyushiEditable] = useState(false);

  const [unit, setUnit] = useState('k円');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'machine') {
      setMachine(value);
    } else if (name === 'toushi') {
      setToushi(value);
      const calculatedSyushi = (kaisyu && toushi) ? (Number(value) - kaisyu) : '';
      setSyushi(calculatedSyushi);
    } else if (name === 'kaisyu') {
      setKaisyu(value);
      // 投資と回収が両方入力されたら収支を計算
      const calculatedSyushi = (kaisyu && toushi) ? (Number(value) - toushi) : '';
      setSyushi(calculatedSyushi);
    } else if (name === 'syushi') {
      setSyushi(value);
    }
  };

  const handleSyushiEditable = () => {
    setIsSyushiEditable(!isSyushiEditable);
  }

  function formatResult(result) {
    const isNegative = result < 0;
    const absoluteValue = Math.abs(result);
    const formattedAbsoluteValue = absoluteValue.toString().padStart(5, ' '); // スペースで埋める
  
    const formattedResult = isNegative
      ? `-${formattedAbsoluteValue}`
      : ` ${formattedAbsoluteValue}`; // プラスの場合スペースを入れて調整
  
    return `${formattedResult}`;
  }

  {/* 取得したProfile profile.displayNameで取得*/}
  const modifySendMessage = () => {
    // もし machine が空でないなら、machine の値を含める
    if (machine) {
      return `機種:\t${machine}\n投資:\t${formatResult(toushi)} ${unit}\n回収:\t${formatResult(kaisyu)} ${unit}\n収支:  ${formatResult(syushi)} ${unit}`;
    }
    else {
      return `投資:  ${formatResult(toushi)} ${unit}\n回収:  ${formatResult(kaisyu)} ${unit}\n収支:  ${formatResult(syushi)} ${unit}`;
    }
  }

  const onClickSubmitButton = async () => {
    await sendMessage({ text: modifySendMessage() });
    exitLiff();
  }

  if (loading) return <p>...loading</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <form>
      <div class="form-row align-items-center">
        <label class="form-group col-4">機種(任意)</label>
        <div class="form-group col-8">
          <input class="form-control mt-0" type="text" name="machine" placeholder="" onChange={handleInputChange}/>
        </div>
      </div>

      <div class="form-row align-items-center">
        <label class="form-group col-9">単位</label>
        <div class="form-group col-3 pull-right">
          <select id="inputState" name="unit" class="form-control mt-0" onChange={(e) => setUnit(e.target.value)}>
            <option selected>k円</option>
            <option>枚</option>
            <option>玉</option>
          </select>
        </div>
      </div>

      <div class="form-row align-items-center">
        <label class="form-group col-5">投資</label>
        <div class="form-group col-7">
            <input class="form-control mt-0" type="number" name="toushi" required onChange={handleInputChange}/>
        </div>
      </div>

      <div class="form-row align-items-center">
        <label class="form-group col-5">回収</label>
        <div class="form-group col-7">
          <input class="form-control mt-1" type="number" name="kaisyu" required onChange={handleInputChange}/>
        </div>
      </div>


      <div class="form-row align-items-center">
        <div class="form-group col-3">
          <input type="checkbox" class="form-check-input" id="check1" onClick={handleSyushiEditable()}/>
        </div>
      </div> 
      <div class="form-row align-items-center">
        <label class="form-group col-2">収支</label>
        <div class="form-group col-7">
          <input class="form-control mt-1" type="number" name="syushi" value={syushi} readonly={!isSyushiEditable} onChange={handleInputChange}/>
        </div>
      </div>

      <p></p>
      <button type="submit" class="btn btn-primary pull-right" onClick={onClickSubmitButton}>投稿</button>
    </form>
  );
}

export default App;

