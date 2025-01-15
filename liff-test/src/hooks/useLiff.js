import { useState, useEffect } from 'react';
import { liff } from '../lib/liff';

function useLiff({ liffId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);

  const initLiff = async ({ liffId }) => {
    setLoading(true);
    try {
      // LIFF APIのinitを呼び出して初期化
      liff.init({ liffId });
    } catch (error) {
      alert({ error });
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const exitLiff = () => {
    liff.closeWindow();
  }

  const fetchProfile = async () => {
    setLoading(true);
    try {
      // LIFF APIのgetProfileを実行し結果をセット
      setProfile(await liff.getProfile());
    } catch (error) {
      console.log({ error });
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // 送信する内容を引数で受け取る
  const sendMessage = async ({ text }) => {
    setLoading(true);
    try {
      // LIFF APIのsendMessagesを実行
      await liff.sendMessages([{ type: 'text', text }]);
      console.log(`success send message: ${text}`);
    } catch (error) {
      console.log({ error });
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // useLiffが呼ばれたらinitialize処理を実行する
  useEffect(() => {
    initLiff({ liffId });
  }, [liffId]);

  return { exitLiff, loading, error, fetchProfile, profile, sendMessage };
}

export default useLiff;

