/**
 * @swagger
 * definitions:
 *  board:
 *      type: object
 *      required:
 *          - bid
 *          - wid
 *          - thumbnail
 *          - title
 *          - wdate
 *          - process
 *          - recruit
 *          - recruite
 *          - ship
 *          - shipe
 *          - share
 *          - sharee
 *          - place
 *          - sharetime
 *          - mPrice
 *          - remain
 *          - siteurl
 *          - view
 *          - goal
 *          - collect
 *          - content
 *          - cnt
 *      properties:
 *          bid:
 *              type: integer
 *              description: 게시글 고유 번호
 *          wid:
 *              type: string
 *              description: 작성자 회원번호
 *          thumbnail:
 *              type: string
 *              description: 썸네일 이미지 저장 경로
 *          title:
 *              type: string
 *              description: 게시글 제목
 *          wdate:
 *              type: date-time
 *              description: 게시글 작성 시간
 *          process:
 *              type: integer
 *              description: 공구 진행 상황
 *          recruit:
 *              type: date
 *              description: 공구 모집 시작일
 *          recruite:
 *              type: date
 *              description: 공구 모집 마감일
 *          ship:
 *              type: date
 *              description: 배송 시작 예정일
 *          shipe:
 *              type: date
 *              description: 배송 마감 예정일
 *          share:
 *              type: date
 *              description: 배부 시작 예정일
 *          sharee:
 *              type: date
 *              description: 배부 마감 예정일
 *          place:
 *              type: string
 *              description: 배부 장소
 *          sharetime:
 *              type: date-time
 *              description: 배부 예정 시각
 *          mPrice:
 *              type: integer
 *              description: 최소 구매 가능 금액
 *          remain:
 *              type: integer
 *              description: 공구마감까지 남은 금액
 *          siteurl:
 *              type: string
 *              description: 상품 판매 사이트 주소
 *          view:
 *              type: integer
 *              description: 조회수
 *          goal:
 *              type: integer
 *              description: 공구 목표 금액
 *          collect:
 *              type: integer
 *              description: 현재까지 모인 금액
 *          content:
 *              type: string
 *              description: 상세 내용
 *          cnt:
 *              type: integer
 *              description: 현재까지 모집된 인원
 */
/**
 * @swagger
 *  /board/list/{page}:
 *    get:
 *      tags:
 *      - board
 *      description: bid에 해당하는 게시글 정보를 가져온다.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: page
 *        in: path
 *        required: true
 *        type: integer
 *      responses:
 *       200:
 *        schema:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *                  example: success
 *              status:
 *                  type: integer
 *                  example: 200
 *              result:
 *                  type: array
 *                  items:
 *                      $ref: '#/definitions/board'
 */
const pool = require('../database/database');
const returnResults = require('../errorHandler');

async function boardListAPI(req, res) {
    let page = req.params.page;
    var num = parseInt((page-1) * 5);
    var sql = "SELECT bid, wid, thumbnail, title, process, DATE_FORMAT(recruite, '%Y-%m-%d') AS recruite, mprice, remain from board ORDER BY wdate desc limit " + num + ", 5;"
    const conn = await pool.getConnection();
    try {
        const sel = await conn.query(sql);
        returnResults(false, res, sel[0]);
    } catch (err) {
        returnResults(err, res, {});
    } finally {
        conn.release();
    }
}

module.exports = {
    boardListAPI : boardListAPI
}