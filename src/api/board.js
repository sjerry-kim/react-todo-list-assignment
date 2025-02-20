import { supabase } from 'utils/supabase';
import { redirect } from 'react-router-dom';
import { checkSession } from './auth';

export const getBoard = async (user, ascending, search) => {
  try {
    const result = await checkSession();

    // todo 커스텀 alert에 리디랙션 해주기
    if (!result.session) {
      const error = new Error(result.message);
      error.status = 401;
      throw new Error(result.message);
    }

    const { data, status, error } = await supabase
      .from('todos')
      .select()
      .eq('user_id', user.id)
      .like('text', `%${search}%`)
      .order('created_at', { ascending: ascending });

    if (error) throw new Error(error.message || '통신 오류가 발생하였습니다.');

    return {
      status: status,
      data: data.length ? data.map((item, index) => ({ ...item, rn: ascending ? index + 1 : data.length - index })) : [],
    };
  } catch (error) {
    throw new Error(error.message || '데이터를 불러오는 중 오류가 발생했습니다.');
  }
};

export const postBoard = async (user, text) => {
  try {
    const result = await checkSession();

    // todo 커스텀 alert에 리디랙션 해주기
    if (!result.session) {
      const error = new Error(result.message);
      error.status = 401;
      throw new Error(result.message);
    }

    const { status, error } = await supabase.from('todos').insert({ user_id: user.id, text: text });

    if (error) throw new Error(error.message || '통신 오류가 발생하였습니다.');

    return { status: status };
  } catch (error) {
    throw new Error(error.message || '등록에 실패하였습니다.');
  }
};

export const patchBoard = async (user, idx, text) => {
  try {
    const result = await checkSession();

    // todo 커스텀 alert에 리디랙션 해주기
    if (!result.session) {
      const error = new Error(result.message);
      error.status = 401;
      throw new Error(result.message);
    }

    const { data, status, error } = await supabase.from('todos').update({ text: text }).eq('idx', idx).select();

    if (error) throw new Error(error.message || '통신 오류가 발생하였습니다.');

    return { status: status, data: data };
  } catch (error) {
    throw new Error(error.message || '수정에 실패하였습니다.');
  }
};

export const deleteBoard = async (selectedList) => {
  try {
    const result = await checkSession();

    // todo 커스텀 alert에 리디랙션 해주기
    if (!result.session) {
      const error = new Error(result.message);
      error.status = 401;
      throw new Error(result.message);
    }

    const { status, error } = await supabase.from('todos').delete().in('idx', selectedList);

    if (error) throw new Error(error.message || '통신 오류가 발생하였습니다.');

    return { status: status };
  } catch (error) {
    throw new Error(error.message || '삭제에 실패하였습니다.');
  }
};
