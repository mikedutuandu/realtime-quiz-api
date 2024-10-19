export enum AuthStrategy {
  Jwt = 'jwtauth',
}
export enum UserStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
}

export enum OtpType {
  VERIFY_EMAIL = 'VERIFY_EMAIL',
}

export enum QuizDifficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export enum Time {
  MINUTE_TO_SECOND = 60,
  HOUR_TO_SECOND = 3600,

  HOUR_TO_MINUTE = 60,
  DAY_TO_MINUTE = 24 * 60,
  MONTH_TO_MINUTE = 30 * 24 * 60,
  WEEK_TO_MINUTE = 7 * 24 * 60,
  YEAR_TO_MINUTE = 365 * 24 * 60,
}

