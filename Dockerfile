# 1) 빌드 스테이지
FROM node:18-alpine AS builder
WORKDIR /app

# 의존성 설치 최적화를 위해 package.json 및 lock 파일 먼저 복사
COPY package*.json ./
RUN npm ci

# 빌드에 필요한 모든 소스 코드 복사
COPY . .

# 실제 Vite 애플리케이션 빌드 실행
RUN npm run buildy
# --- DEBUG START ---
RUN echo ">>>> Contents of /app/dist in builder stage:"
RUN ls -R /app/dist
# --- DEBUG END ---

# 2) 런타임 스테이지: serve 로 서빙
FROM node:18-alpine
WORKDIR /app

# serve 패키지만 설치
RUN npm install -g serve

# 빌더 스테이지의 /app/dist 내용을 현재 스테이지의 ./build 폴더로 복사
COPY --from=builder /app/dist ./build
# --- DEBUG START ---
RUN echo ">>>> Contents of /app/build in runtime stage (after copy):"
RUN ls -R /app/build
# --- DEBUG END ---

# 컨테이너 외부에 노출할 포트
EXPOSE 80

# serve 로 ./build 폴더를 80 포트에 서빙
CMD ["serve", "-s", "build", "-l", "80"]