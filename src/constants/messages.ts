export const MSG = {
  NEED_LOGIN: '로그인이 필요합니다',
  // 체크리스트
  LOGIN_BEFORE_POST_MISSION_CLEAR: '미션을 진행하려면 먼저 로그인하세요.',
  INVALID_MISSION_TYPE: '유효하지 않은 미션 이름입니다',
  NOTFOUND_MISSION_INFO: '해당 미션 정보를 찾을 수 없습니다.',
  // 공감게시판
  FAIL_TO_GET_POST_META: '포스트 메타데이터를 가져오는 데 실패했습니다:',
  SUCCESS_UPLOAD_COMMENT: '댓글이 등록되었습니다.',
  FAIL_TO_UPLOAD_COMMENT: '댓글 등록에 실패했습니다.',
  FAIL_TO_UPDATE_LIKE: '좋아요 업데이트에 실패했습니다.'
};

export const SUCCESS = {
  EMAIL_CHECK: '사용 가능한 이메일입니다.',
  NICKNAME_CHECK: '사용 가능한 닉네임입니다.',
  UPDATE_PROFILE: '프로필 변경이 완료되었습니다.',
  LOGIN: '로그인이 완료되었습니다.',
  SIGNUP: '회원가입이 완료되었습니다. 자동 로그인 됩니다.',
  PASSWORD: '비밀번호가 일치합니다.'
} as const;

export const FAIL = {
  LOGOUT: '로그아웃에 실패했습니다. 다시 시도해주세요.',
  SOCIAL_LOGIN: '소셜 로그인에 실패했습니다. 다시 시도해주세요.',
  UPDATE_PROFILE: '사용자 정보 변경에 실패했습니다.',
  LOGIN: '이메일 또는 비밀번호 오류입니다.',
  SESSION: '사용자 세션 정보가 존재하지 않습니다.',
  GET_PROFILE: '사용자 프로필 정보를 받아오는 데 실패했습니다.',
  DUPLICATE: '중복확인에 실패했습니다. 다시 시도해주세요.',
  INCREMENT_VIEW_COUNT: '조회수 처리에 실패했습니다.',
  GET_VIEW_COUNT: '조회수 데이터 불러오기를 실패했습니다.'
} as const;

export const AUTH_ERROR = {
  EMAIL_CHECK: '이메일 중복확인을 해주세요.',
  NICKNAME_CHECK: '닉네임 중복확인을 해주세요.',
  CHECK_NICKNAME_FAIL: '이미 사용 중인 닉네임입니다.',
  CHECK_EMAIL_FAIL: '이미 사용 중인 이메일입니다.',
  EMPTY_NICKNAME: '최소 2자 이상이어야 합니다.',
  EMPTY_EMAIL: '유효한 이메일을 입력하세요.'
} as const;
