import * as React from 'react';
import Svg, {
  SvgProps,
  G,
  Circle,
  Path,
  ClipPath,
  Defs,
  Rect,
} from 'react-native-svg';
import {colors} from '../../Styles/Styles';

export const PlaneSvg: React.FC<{color?: string}> = props => {
  return (
    <Svg width="95" height="70" viewBox="0 0 95 70" fill="none">
      <G clipPath="url(#clip0_1695_30669)">
        <Path
          d="M84.1896 66.9498C84.0387 67.1592 83.8947 67.3776 83.7617 67.607C81.7726 71.0374 82.8452 75.3946 86.1338 77.5368C86.1959 77.5772 86.3228 77.653 86.4357 77.7193C86.553 77.7878 86.5924 77.9377 86.5244 78.0549L82.2252 85.4693C80.2675 88.8456 75.9316 90.0024 72.5407 88.0531L3.54596 48.3904C0.155086 46.4411 -1.00672 42.1239 0.951002 38.7476L4.91394 31.9131C5.16477 31.4805 5.69688 31.3032 6.16163 31.4906C6.50842 31.6305 6.86125 31.7425 7.21801 31.8272C10.3486 32.5718 13.7219 31.231 15.4124 28.3156C16.3332 26.7276 16.598 24.9437 16.2905 23.2736C16.2899 23.2661 16.2888 23.2556 16.2846 23.2458C15.9615 21.5084 15.0181 19.8935 13.5507 18.7523C13.1548 18.4442 13.041 17.8967 13.2924 17.4633L16.6683 11.6411C18.6261 8.26486 22.962 7.10805 26.3529 9.05735L95.3493 48.721C98.7393 50.6698 99.9008 54.9857 97.9436 58.3611L94.2292 64.7668C94.1615 64.8836 94.0102 64.9239 93.8932 64.8565C93.8542 64.8341 93.8208 64.8149 93.8041 64.8057C90.4919 63.0004 86.3742 63.955 84.1896 66.9498Z"
          fill="#0067C5"
        />
        <Path
          d="M97.9436 58.3611L94.2302 64.7655C94.1622 64.8828 94.0116 64.9231 93.8932 64.8565C93.7756 64.7903 93.6412 64.716 93.572 64.6814C90.3016 63.0433 86.3233 64.0247 84.1896 66.9498L10.3192 48.6908C6.51764 47.7513 4.20445 43.9224 5.14697 40.1389L7.21801 31.8272C10.3486 32.5718 13.7219 31.231 15.4124 28.3156C16.3332 26.7276 16.598 24.9437 16.2905 23.2736C16.2899 23.2661 16.2888 23.2556 16.2846 23.2458C15.9615 21.5084 15.0181 19.8935 13.5507 18.7523C13.1548 18.4442 13.041 17.8967 13.2924 17.4633L16.6683 11.6411C18.6261 8.26486 22.962 7.10805 26.3529 9.05735L95.3493 48.721C98.7393 50.6698 99.9008 54.9857 97.9436 58.3611Z"
          fill="#0055A3"
        />
        <Path
          d="M92.6263 63.403L69.6345 57.7198L66.6792 56.9891L15.3036 44.2892C11.5033 43.3506 9.18935 39.5215 10.1321 35.7376L12.0065 28.2196C12.1449 27.6645 12.6673 27.2877 13.2394 27.3385C16.8385 27.6569 20.2335 25.3292 21.1303 21.7287C22.028 18.132 20.1251 14.4956 16.7983 13.099C16.2701 12.8772 15.9706 12.3187 16.1085 11.7647L17.7058 5.35921C18.6503 1.57637 22.4952 -0.730429 26.2944 0.209988L77.67 12.9099L80.6254 13.6405L103.617 19.3237C107.417 20.2624 109.732 24.0898 108.79 27.8736L107.092 34.6839C107.009 35.0172 106.678 35.2275 106.339 35.161C106.135 35.1208 105.925 35.0832 105.791 35.0682C102.128 34.6616 98.6402 37.0076 97.7293 40.6641C96.7843 44.4576 98.951 48.295 102.617 49.5044C102.651 49.5154 102.695 49.5287 102.745 49.5431C103.079 49.6399 103.278 49.9813 103.194 50.3174L101.215 58.2535C100.27 62.0366 96.4265 64.3417 92.6263 63.403Z"
          fill="#D3E1F5"
        />
        <Path
          d="M108.838 27.6536C109.64 23.9429 107.343 20.2449 103.617 19.3237L26.2944 0.209988C22.6372 -0.694059 18.9398 1.40733 17.8262 4.93961L108.838 27.6536Z"
          fill="#B3CEEC"
        />
        <Path
          d="M79.1479 13.2744L68.1571 57.3544L15.3036 44.2892C11.5033 43.3506 9.18935 39.5215 10.1321 35.7376L12.0062 28.2206C12.1446 27.6655 12.667 27.2887 13.2391 27.3395C16.8385 27.6578 20.2324 25.3295 21.1303 21.7287C22.0274 18.1307 20.1244 14.4963 16.7983 13.099C16.2701 12.8772 15.9706 12.3187 16.1085 11.7647L17.7058 5.35921C18.6491 1.57594 22.4948 -0.729278 26.2944 0.209988L79.1479 13.2744Z"
          fill="#B3CEEC"
        />
        <Path
          d="M79.1479 13.2744L26.2944 0.209988C23.9851 -0.357403 21.2923 0.276887 19.539 2.10405C18.7709 2.8786 18.1739 3.83873 17.827 4.93774C17.8268 4.93836 17.8263 4.93899 17.8262 4.93961L77.512 19.8355L79.1479 13.2744Z"
          fill="#98BCE5"
        />
        <Path
          d="M44.8741 29.8799L38.1293 40.1125C37.8903 40.4749 38.0827 40.9639 38.5053 41.0683L41.9498 41.9198C42.167 41.9735 42.3965 41.9088 42.5531 41.7498L52.2352 31.9235L44.8741 29.8799Z"
          fill="#EAF6FF"
        />
        <Path
          d="M45.8207 26.0834L44.6656 13.8979C44.6246 13.4663 45.0243 13.1237 45.4469 13.2281L48.8914 14.0796C49.1086 14.1333 49.2809 14.2972 49.3448 14.5108L53.287 27.7049L45.8207 26.0834Z"
          fill="#EAF6FF"
        />
        <Path
          d="M31.4694 22.312C31.4694 22.312 55.297 26.8585 58.0507 27.5393C60.8044 28.22 62.0812 32.118 62.0812 32.118C62.0812 32.118 59.1216 34.9691 56.3679 34.2883C53.6142 33.6075 30.4176 26.5301 30.4176 26.5301L27.9835 26.0562C27.6881 25.9986 27.4746 25.7417 27.4728 25.442L27.4429 19.8706C27.4399 19.3108 28.1174 19.0262 28.5182 19.4189L31.4694 22.312Z"
          fill="#EAF6FF"
        />
        <Path
          d="M97.1121 30.4778L83.7845 27.1834C83.1949 27.0376 82.8355 26.4435 82.9819 25.8564L83.9354 22.0325C84.0818 21.4454 84.6785 21.0875 85.2682 21.2333L98.5957 24.5278C99.1853 24.6735 99.5447 25.2677 99.3983 25.8548L98.4448 29.6787C98.2983 30.2659 97.7017 30.6236 97.1121 30.4778Z"
          fill="#60B7FF"
        />
        <Path
          d="M63.5455 45.185L60.9551 55.574L52.4823 53.4796L55.0727 43.0906C55.2395 42.4219 55.9193 42.0142 56.5909 42.1802L62.6314 43.6735C63.303 43.8396 63.7123 44.5163 63.5455 45.185Z"
          fill="#FEE903"
        />
        <Path
          d="M72.1775 80.5663L59.5734 73.3206C59.0349 73.0111 58.8504 72.3257 59.1613 71.7895L60.9821 68.6495C61.293 68.1133 61.9813 67.9297 62.5198 68.2392L75.1239 75.4849C75.6622 75.7943 75.8468 76.4798 75.5359 77.016L73.7152 80.156C73.4043 80.6922 72.7158 80.8757 72.1775 80.5663Z"
          fill="#FFEFD2"
        />
        <Path
          d="M69.6345 57.7198L66.6792 56.9891L67.1933 54.9305C67.3951 54.1179 68.2214 53.6223 69.0365 53.8249C69.8509 54.0247 70.3504 54.8485 70.1469 55.6601L69.6345 57.7198Z"
          fill="#D3E1F5"
        />
        <Path
          d="M71.9083 48.5974L72.8828 44.6942C73.0845 43.8815 72.5868 43.0588 71.7724 42.8589C70.9572 42.6563 70.1309 43.1519 69.9274 43.9635L68.9547 47.8678C68.786 48.5385 69.0962 49.216 69.6691 49.5454C69.7904 49.6151 69.9235 49.6683 70.0651 49.7031C70.8802 49.9057 71.7066 49.4101 71.9083 48.5974ZM74.6441 37.6314L75.6168 33.7272C75.8186 32.9145 75.3216 32.0945 74.5064 31.8919C73.6903 31.691 72.865 32.1849 72.6632 32.9975L71.6888 36.9008C71.5219 37.5725 71.832 38.2501 72.4032 38.5784C72.5244 38.6481 72.6576 38.7014 72.7992 38.7361C73.6143 38.9387 74.4406 38.4431 74.6441 37.6314ZM77.3782 26.6645L78.3499 22.7619C78.5534 21.9503 78.0539 21.1265 77.2405 20.9249C76.4243 20.7241 75.598 21.2196 75.3963 22.0323L74.4228 25.9338C74.256 26.6055 74.5661 27.2831 75.139 27.6124C75.2585 27.6811 75.3907 27.7361 75.5322 27.7708C76.3484 27.9717 77.1747 27.4761 77.3782 26.6645Z"
          fill="#D3E1F5"
        />
        <Path
          d="M78.268 16.8048C78.1265 16.7701 77.9943 16.7152 77.8731 16.6454C77.3001 16.3161 76.99 15.6385 77.1576 14.9696L77.67 12.9099L80.6254 13.6405L80.1113 15.6992C79.9095 16.5119 79.0842 17.0057 78.268 16.8048Z"
          fill="#D3E1F5"
        />
        <Path
          d="M84.9032 50.6797C84.3306 50.3505 84.0207 49.673 84.188 49.0022C84.3905 48.1898 85.216 47.6949 86.0319 47.8966L94.293 49.9386C95.1074 50.1393 95.6059 50.9619 95.4033 51.7745C95.2008 52.5869 94.3753 53.0818 93.5593 52.8802L85.2982 50.8382C85.1564 50.8031 85.0241 50.7492 84.9032 50.6797Z"
          fill="#98BCE5"
        />
        <Path
          d="M83.5885 55.9524C83.0159 55.6233 82.706 54.9458 82.8734 54.2749C83.0758 53.4626 83.9014 52.9675 84.7173 53.1692L92.9783 55.2114C93.7928 55.4122 94.2912 56.2347 94.0886 57.0473C93.8862 57.8595 93.0606 58.3546 92.2447 58.153L83.9837 56.1108C83.8416 56.0757 83.7091 56.0218 83.5885 55.9524Z"
          fill="#98BCE5"
        />
        <Path
          d="M17.8146 37.4543C17.242 37.1251 16.9321 36.4477 17.0994 35.7769C17.3019 34.9645 18.1274 34.4696 18.9433 34.6712L30.5935 37.5511C31.4079 37.7521 31.9066 38.5745 31.7038 39.387C31.5012 40.1994 30.6758 40.6944 29.8598 40.4927L18.2097 37.6128C18.0677 37.5776 17.9354 37.5237 17.8146 37.4543Z"
          fill="#596C76"
        />
        <Path
          d="M53.0092 67.5588L38.9965 59.5033C38.2684 59.0848 38.0191 58.158 38.4394 57.4332C38.8597 56.7083 39.7904 56.4599 40.5185 56.8785L54.5312 64.9339C55.2594 65.3525 55.5086 66.2792 55.0883 67.0041C54.668 67.7289 53.7373 67.9773 53.0092 67.5588Z"
          fill="#60B7FF"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1695_30669">
          <Path
            d="M0 0H95V20C95 43.5702 95 55.3553 87.6777 62.6777C80.3553 70 68.5702 70 45 70H0V0Z"
            fill="white"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
