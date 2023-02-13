# Vinasport-Player-Web

## Bắt đầu

Import file player-sdk.js vào dự án và link với file index.html. Sau khi import thành công, window DOM element sẽ chứa 1 biến là playerSDK.

Biến playerSDK chứa 1 instance là VinasportPlayer.

``` javascript
const { VinasportsPlayer } = window.playerSDK;
```

Chúng ta cần truyền vào instance 3 tham số lần lượt là container, infoPlayer và hàm callback handleError.

container là thẻ div chứa player.

``` javascript
const container = document.querySelector("#container");
```

infoPlayer là object gồm các key chứa thông tin của player.

``` javascript
 const infoPlayer = {
      src: 'https://cdn.vtvcab.vn/hls/vod/onsportsdev/DISTRIBUTE/new/highlights-davis-cup-2022-bang-d-my-vs-anh-kabPd76vYQ.mp4/index.m3u8',
      contentId: 'vtvcab-boxmovie1',
      signKey: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjczNzQ0NzEsImlhdCI6MTY2NzI4ODA3MSwiYXBwX25hbWUiOiJPbnNwb3J0cyIsImFwcF91c2VyX2lkIjoiNjUxIiwibmFtZSI6IjAzOTk2Njc5ODgiLCJwaG9uZSI6IjAzOTk2Njc5ODgiLCJlbWFpbCI6InRodXllbm5ndXllbnF1YW5nQGdtYWlsLmNvbSIsImNvbnRlbnRfaWQiOiJ2dHZjYWItYm94bW92aWUxIn0.YFiMczsNa_CkxU3es7HrVXcPkFrf3aqVBcvgTwASEQMFhin32NBmSithvCjT99m4jiVCK1pijbSKaPPm-Jn_Gw',
      licenseServer: 'https://vtvcab.stg.ondrm.cloud/license-api/v1/drm/licenses/widevine',
      drm: true,
      duration: 880,
      isLive: false,
      name: 'Set title here.',
      startTime: '2022-10-08T14:00:00.000Z',
      volume: 0.4
    }
```
- src: source của video (string)
- contentId: id của video (string)
- signKey: sign key của video (string)
- licenseServer: license server của video (string)
- drm: true khi video cần sign key để xem, false khi ngược lại (boolean)
- duration: thời lượng của video
- isLive: true khi video dạng livestream, false khi video dạng VOD (boolean)
- name: tiêu đề của video (string)
- startTime: thời gian bắt đầu (string)
- volume: âm lượng video, từ 0 đến 1. Nếu không truyền thì mặc định là 1 (number)

Hàm handleError là function callback trả về mã lỗi khi xảy ra lỗi video.

```javascript
    const handleError = (error) => {
      console.log('error :>> ', error);
    }
```
## Khởi tạo Player

Gọi hàm initialize để khởi tạo player, sau đó gọi hàm destroy ở phần cleanup của useEffect.

``` javascript
useEffect(() => {
    let player = new VinasportsPlayer(container, infoPlayer, handleError)
    player.initialize() 

    return () => {
      player.destroy();
    }
})
```

## Hiển thị lượt views trên video live

Gọi hàm showViews để hiển thị số người xem, hàm nhận tham số dưới dạng int. Nếu nhỏ hơn 100 thì views mặc định hiển thị 100, nếu lớn hơn 100 thì hiển thị lượt views thật.

``` javascript
    player.showViews(90) 
```

## Interactive

Tính năng hiển thị phần interactive của video.

Bao gồm hàm showQuizTop (hiển thị interactive trên cùng video) và showQuizBottom (hiển thị interactive ở dưới cùng video). Hai hàm đều nhận tham số dưới dạng int. Tham số truyền vào chính là giá trị phần trăm của phần interactive muốn chiếm trong video container. Ví dụ: truyền vào 25 thì phần interactive sẽ chiếm 25%.

``` javascript
    player.showQuizTop(25) 
    player.showQuizBottom(25)
```

Gọi hàm hideQuiz sau khi người dùng đã thao tác với interactive xong để ẩn đi.

``` javascript
    player.hideQuiz()
```

## Fingerprint

Tính năng hiển thị fingerprint trên video live có DRM.

``` javascript
    if(isLive) {
        callFingerprintAPI(this.options.contentId, this.options.signKey, fingerprints, checkFingerprint, hideFingerprint, onError);
      }
```

Hàm callFingerprintAPI đã bao gồm trong hàm khởi tạo Player. Hàm sẽ gọi lần đầu khi video là định dạng Live. Hàm này sẽ tự gọi lại sau 1 khoảng thời gian (được lấy từ API Fingerprint Health-Check). Nếu user bị block thì sẽ trả về mã lỗi 403.

## Mã lỗi

Mã lỗi được trả về bởi callback function onError.

- Lỗi 400: lỗi định dạng link
- Lỗi 401: sign key sai hoặc hết hạn
- Lỗi 403: user vi phạm bản quyền & bị block

Các lỗi khác sẽ được trả về dưới định dạng number 4 chữ số. Chi tiết xem tại https://shaka-player-demo.appspot.com/docs/api/shaka.util.Error.html