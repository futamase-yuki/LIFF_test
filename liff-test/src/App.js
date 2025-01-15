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

  const [toushiUnit, setToushiUnit] = useState('');
  const [kaisyuUnit, setKaisyuUnit] = useState('');
  const [syushiUnit, setSyushiUnit] = useState('');

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

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const obj = JSON.parse(formJson);

    setToushiUnit(obj.toushiUnit);
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
      return `機種: ${machine}\n投資:  ${formatResult(toushi)}${toushiUnit}\n回収:  ${formatResult(kaisyu)}\n収支:  ${formatResult(syushi)}`;
    }
    else {
      return `投資:  ${formatResult(toushi)}\n回収:  ${formatResult(kaisyu)}\n収支:  ${formatResult(syushi)}`;
    }
  }

  const onClickSubmitButton = async () => {
    await sendMessage({ text: modifySendMessage() });
    exitLiff();
  }

  if (loading) return <p>...loading</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <section>
            <div class="form-row align-items-center">
              <label class="form-group col-4">機種(任意)</label>
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
                <select id="inputState" name="toushiUnit" class="form-control mt-0">
                  <option selected>k円</option>
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
                <select id="inputState" name="kaisyuUnit" class="form-control mt-1">
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
                <select id="inputState" name="syushiUnit" class="form-control mt-1">
                  <option selected>k円</option>
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

