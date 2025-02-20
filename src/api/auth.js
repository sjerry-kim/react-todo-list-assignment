import { supabase } from 'utils/supabase';

// 회원가입
export const signUp = async (jsonData) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: jsonData.email,
      password: jsonData.password,
      options: {
        data: {
          display_name: jsonData.displayName,
        },
        emailRedirectTo: 'http://localhost:3000/signup-confirm',
      },
    });

    if (error) throw new Error(error.message || '통신 오류가 발생하였습니다.');

    return { status: 200, data };
  } catch (error) {
    if (error.status === 422) {
      throw new Error('이미 존재하는 이메일입니다.');
    } else {
      throw error;
    }
  }
};

// 로그인
export const signIn = async (jsonData) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: jsonData.email,
      password: jsonData.password,
    });

    if (error) {
      const errorMessage =
        error.status === 400 && error.code === 'email_not_confirmed'
          ? '이메일 인증 후 로그인 할 수 있습니다.'
          : error.status === 400 && error.code === 'invalid_credentials'
            ? '로그인 정보가 일치하지 않습니다.'
            : `통신오류가 발생하였습니다.`;
      throw new Error(errorMessage);
    }

    return { status: 200, user: data.user };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 로그아웃
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error.message || '통신 오류가 발생하였습니다.');

    return { status: 200, user: null };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 권한 확인
export const checkSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw new Error(error.message || '통신 오류가 발생하였습니다.');

    const message = data.session ? '' : '세션이 만료되었습니다.';

    return { status: 200, session: data.session, message: message };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
