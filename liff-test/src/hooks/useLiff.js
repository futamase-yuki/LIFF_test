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
      await liff.init({ liffId });
      alert('success liff init');
    } catch (error) {
      alert({ error });
      setError(error);
    } finally {
      setLoading(false);
    }
  };

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

  // useLiffが呼ばれたらinitialize処理を実行する
  useEffect(() => {
    initLiff({ liffId });
  }, [liffId]);

  return { loading, error };
}

export default useLiff;

