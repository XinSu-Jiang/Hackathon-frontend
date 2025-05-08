# 1) 빌드 스테이지: public → build/ 복사
FROM node:18-alpine AS builder
WORKDIR /app

# package.json, lockfile 복사 후 의존성 설치
COPY package*.json ./
RUN npm ci

# public 디렉터리와 build 스크립트 복사
COPY public public
RUN npm run build    # build/ 에 public/* 복사

# 2) 런타임 스테이지: serve 로 서빙
FROM node:18-alpine
WORKDIR /app

# serve 패키지만 설치
RUN npm install -g serve

# 빌드된 정적 파일 복사
COPY --from=builder /app/build ./build

# 컨테이너 외부에 노출할 포트
EXPOSE 80

# serve 로 build/ 폴더를 80 포트에 서빙
CMD ["serve", "-s", "build", "-l", "80"]