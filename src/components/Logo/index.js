import './index.scss'
import LogoH from '../../assets/images/LogoH.png'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Logo = () => {
  const bgRef = useRef()
  const outlineLogoRef = useRef()
  const solidLogoRef = useRef()

  useEffect(() => {
    const path = outlineLogoRef.current
    if (!path) return

    const length = path.getTotalLength()

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    })

    const tl = gsap.timeline()

    tl.to(bgRef.current, {
      duration: 1,
      opacity: 1,
    })

    tl.to(path, {
      strokeDashoffset: 0,
      duration: 20,
      ease: 'none',
    })

    // Reveal the solid logo
    gsap.fromTo(
      solidLogoRef.current,
      { opacity: 0 },
      { opacity: 1, delay: 4, duration: 4 },
    )
  }, [])

  return (
    <div className='logo-container' ref={bgRef}>
      <img ref={solidLogoRef} className='solid-logo' src={LogoH} alt='solid' />
      <svg viewBox='0 0 3000 3000' xmlns='http://www.w3.org/2000/svg'>
        <g className='svg-container' fill='none'>
          <path
            ref={outlineLogoRef}
            d='m 2290.2216,2673.7174
c -6.3138,-1.0199 -18.6393,-1.944 -27.3901,-2.0539 -8.7506,-0.1095 -26.8311,-2.7052 -40.179,-5.7676 -13.3477,-3.0622 -33.0507,-7.2471 -43.7843,-9.2997 -114.4038,-21.8765 -268.4833,-114.8803 -345.0396,-208.2687 -7.8276,-9.5485 -18.6719,-22.3879 -24.0983,-28.5314 -56.0896,-63.5023 -116.0728,-200.5428 -127.8168,-292.0164 -6.8963,-53.7153 -8.1094,-107.2309 -8.1315,-358.7105
l -0.023,-253.8491 -2.8701,1.1828
c -1.5784,0.6506 -78.8084,44.682 -171.622,97.8474
l -168.7521,96.6646 0.7213,135.4853 0.7214,135.4853 8.2158,16.5521
c 15.3595,30.9446 49.3763,61.0942 75.4733,66.8928
l 12.7643,2.8362 22.0091,-2.5572 22.0087,-2.557 11.2756,-6.9594
c 6.2015,-3.8276 12.1068,-6.9593 13.1224,-6.9593 3.5084,0 4.6824,26.5308 4.921,111.1987
l 0.2394,84.9835 -9.9699,5.2826
c -5.4837,2.9053 -112.771,62.5224 -238.4167,132.4824 -125.6456,69.9601 -266.67419,148.4622 -313.39669,174.4492 -46.72249,25.9866 -109.14176,60.714 -138.7092,77.1718 -52.2856,29.1029 -61.71184,33.3646 -59.15296,26.7442 0.67567,-1.7482 -0.21589,-42.0116 -1.98145,-89.4742 -1.76536,-47.4623 -3.24096,-89.1418 -3.27888,-92.6207
l -0.0684,-6.3251 5.78441,-2.1837
c 26.27455,-9.9185 87.48616,-64.8014 113.62774,-101.88 19.85055,-28.1555 41.09124,-72.3054 47.48869,-98.7079
l 3.59024,-14.8174 1.6992,-311.1649
c 0.93445,-171.1407 1.99314,-473.2443 2.35258,-671.3413
l 0.65373,-360.17627 -2.89516,-19.37661
c -3.19826,-21.40493 -16.15037,-75.77259 -21.45106,-90.044
C 805.59371,581.83981 642.17805,467.41223 438.5927,488.74401
c -97.58896,10.22558 -206.11129,67.44416 -258.8322,136.47011 -5.87646,7.69392 -14.63321,18.33048 -19.45924,23.63688 -8.3467,9.1775 -30.42039,41.8152 -43.88112,64.88183 -10.981,18.81764 -30.965414,66.71858 -37.996519,91.07558 -6.124203,21.21434 -10.2987,39.11579 -18.67592,80.08453 -1.562621,7.6417 -3.04075,41.61563 -3.521059,80.92563
l -0.828155,67.75473 4.499144,26.2153
c 6.230052,36.3033 10.545746,52.3756 20.481452,76.2799 4.710135,11.3316 10.396508,26.245 12.636418,33.1407 40.119659,123.5039 192.461899,260.5313 306.581189,275.7612 56.3396,7.5188 57.58817,7.8733 69.75324,19.8047 3.63402,3.5644 9.16516,11.9807 12.29132,18.7028
l 5.68428,12.2221 -1.06454,16.4693 -1.06466,16.4696 -7.35988,10.6214
c -17.40899,25.1227 -30.77081,32.3732 -56.64491,30.7374
l -13.97729,-0.8835 -17.48682,-8.4665
c -9.61799,-4.6564 -18.6183,-8.4663 -20.00094,-8.4663 -11.81545,0 -116.42171,-68.2629 -143.49829,-93.6426
C 67.846209,1310.0838 4.9730734,1174.9882 0.86539313,974.30376
L -0.207734,921.87302 5.6260364,880.9739
C 19.024035,787.04555 37.501589,730.97022 77.404919,663.13884 123.78399,584.2999 146.53061,553.66787 190.57712,510.7344
c 36.11946,-35.20659 66.53688,-59.59439 111.35343,-89.27976 52.68971,-34.9004 169.82733,-81.52471 220.41097,-87.73017 6.31386,-0.77457 19.22859,-2.8069 28.69937,-4.51628 34.84488,-6.28915 57.60053,-8.00891 105.97403,-8.00891
h 49.48503
l 39.93772,5.62655
c 50.40116,7.10063 58.26891,8.61321 96.18844,18.49193 32.07264,8.35552 39.11376,10.66811 75.65154,24.84662 33.81725,13.12297 91.78585,44.4207 116.53525,62.91825 6.5755,4.91436 12.6311,8.93534 13.4569,8.93534 2.0073,0 39.4961,29.42754 59.4087,46.63371 99.9883,86.39923 178.0605,215.66172 199.8786,330.9338 14.4772,76.48997 14.5043,77.09044 17.4143,388.37692 1.3653,146.0652 2.7858,265.8741 3.1567,266.2425 0.3708,0.3682 77.2564,-42.1486 170.8565,-94.4819
l 170.1825,-95.1516
v -135.4092 -135.4091
l -9.2171,-17.59029
c -16.8111,-32.08257 -49.1558,-58.99754 -80.7045,-67.15649
l -12.6335,-3.26713 -20.2849,2.21301
c -13.3523,1.45665 -24.0499,4.10723 -31.3005,7.75521 -6.0583,3.0483 -12.5993,5.54222 -14.5353,5.54222
h -3.5203
l 0.034,-94.03345
c 0.023,-51.71828 0.8442,-95.2983 1.8332,-96.84429 0.9892,-1.54609 123.1464,-70.10043 271.4608,-152.34357 535.3483,-296.86018 482.3716,-267.71065 486.5395,-267.71065 1.6869,0 2.2508,30.20929 1.8362,98.3756
l -0.5983,98.3758 -3.9379,0.57331
c -10.6643,1.55289 -35.3003,20.42175 -65.2025,49.93868
l -32.4051,31.98731 -13.1111,22.28894
c -27.6118,46.94053 -47.6637,96.40092 -51.6343,127.36301 -1.2752,9.94403 -2.4462,283.25848 -2.8791,672.14258
l -0.7302,655.384 4.1589,28.495
c 4.6512,31.8665 12.7587,67.4747 19.8402,87.1376 2.5849,7.178 4.7003,14.4136 4.7003,16.0796 0,1.6658 2.5185,8.1026 5.5966,14.3043 3.0781,6.2016 9.1154,18.9693 13.4156,28.3727 25.7388,56.2796 89.8084,137.0945 130.9437,165.1673 6.5496,4.4698 24.3065,16.6312 39.4599,27.0251 28.8513,19.7899 49.6933,29.6153 95.2816,44.9185 28.1438,9.4476 43.5781,11.8893 102.2591,16.1781
l 36.8246,2.6913 19.426,-2.7715
c 165.6223,-23.6292 314.9737,-157.7065 363.5318,-326.3528 30.8011,-106.9742 31.2427,-201.1715 1.453,-309.8283
l -9.062,-33.0541 -16.9937,-36.4735
c -54.9769,-117.9968 -139.9738,-199.834 -254.5028,-245.0424
l -29.1335,-11.5001 -36.2041,-5.6281 -36.2041,-5.628 -7.4167,-5.2398
c -15.782,-11.149 -23.7722,-28.2193 -23.7722,-50.7864
v -14.847
l 5.5416,-10.7524
c 12.5921,-24.4327 30.0597,-34.6879 59.0835,-34.6879
h 18.8533
l 40.341,19.8003
c 70.091,34.4028 120.3121,71.2655 174.3075,127.9436 88.3312,92.7193 114.1911,134.6621 156.5493,253.9094
l 13.5185,38.0579 8.313,42.7744
c 12.1535,62.5366 16.0966,141.6532 9.1856,184.2965 -1.8289,11.284 -5.4525,35.054 -8.0526,52.8225 -5.5457,37.8992 -17.6432,78.8349 -35.284,119.3949 -17.4247,40.0627 -52.1285,106.9553 -61.6059,118.7471 -4.3949,5.4683 -13.791,18.6617 -20.8806,29.3188 -13.8892,20.8787 -47.1917,58.181 -69.4328,77.7721 -7.5767,6.674 -21.5446,19.3463 -31.0403,28.1606 -24.8884,23.1035 -81.2829,61.4891 -115.9002,78.8897 -16.4161,8.2515 -31.9138,16.2209 -34.4393,17.7098 -7.8618,4.6349 -60.9714,25.5194 -82.654,32.5025 -29.7482,9.5809 -44.6529,12.6079 -98.7257,20.0516
l -48.215,6.637 -44.771,1.1295
c -24.624,0.6212 -49.9367,0.295 -56.2507,-0.7249
z

m 126.2773,-10.498
c 72.9902,-9.7273 88.3799,-12.6994 121.6851,-23.5011 49.2236,-15.9644 127.5127,-52.6123 158.4238,-74.1596 40.6024,-28.3029 58.4075,-41.7599 71.1709,-53.7907 7.5767,-7.1417 20.6581,-19.0114 29.07,-26.377 27.1044,-23.7333 58.8602,-60.1184 76.349,-87.479 3.6063,-5.6421 10.0432,-14.5467 14.3041,-19.7878 26.1297,-32.141 92.4566,-185.8032 92.7023,-214.7665 0.027,-3.2688 3.1184,-24.9208 6.8682,-48.1158
l 6.8174,-42.1725 0.023,-28.495
c 0.023,-36.1334 -3.7962,-98.6377 -6.7409,-110.5604 -1.2387,-5.0151 -4.9411,-22.8507 -8.2278,-39.6345 -11.5436,-58.9512 -51.8953,-160.9906 -80.784,-204.2823 -71.5801,-107.2683 -159.3121,-186.9876 -261.8889,-237.9704
l -41.7769,-20.7639
h -18.2423
c -75.8116,0 -81.1631,96.9168 -5.9134,107.0951 172.3409,23.3108 326.1727,176.532 368.5238,367.061 13.3032,59.8472 18.3308,155.4316 10.6718,202.8841 -35.2152,218.183 -194.3733,386.331 -390.6755,412.7427
l -20.6634,2.7802 -33.2913,-2.6822
c -68.6701,-5.5326 -74.9148,-6.501 -102.8811,-15.9505 -46.8151,-15.8186 -70.5502,-26.5236 -92.7655,-41.8384 -11.7263,-8.0841 -28.0287,-19.214 -36.2274,-24.7332 -59.2342,-39.8749 -148.9172,-160.398 -161.9679,-217.6657 -0.8337,-3.6585 -3.4993,-12.1272 -5.9235,-18.8195 -5.9141,-16.3268 -15.0262,-55.2838 -16.8821,-72.1772 -2.1109,-19.2151 -3.0529,-25.7374 -5.5962,-38.7531 -1.4241,-7.2886 -1.7997,-247.2804 -1.0422,-665.6423
l 1.1851,-654.24428 3.4032,-19.13566
c 14.3411,-80.63716 85.9659,-187.15289 149.6177,-222.50148
l 16.4196,-9.11838 0.052,-90.85792 0.053,-90.85791 -2.87,1.10167
c -1.5784,0.60591 -67.4434,36.93865 -146.3664,80.73951 -78.9233,43.80064 -246.0384,136.50769 -371.3668,206.01565
l -227.87,126.37775
v 89.62779 89.62789
l 5.1658,-1.58233
c 2.8412,-0.87031 7.9369,-2.98129 11.3236,-4.69116 3.3868,-1.70998 16.3294,-3.77093 28.7617,-4.57994
l 22.6042,-1.47078 13.7132,3.9081
c 31.7819,9.05752 65.9951,38.77621 81.3527,70.66539
l 6.6507,13.80989 0.9435,138.55 0.9436,138.55 -2.5014,3.078
c -3.4741,4.2742 -342.6671,193.2969 -347.5385,193.6731
l -3.9469,0.305 -1.5836,-202.8841
c -2.9021,-371.82643 -3.3641,-382.97632 -19.1312,-461.61832 -8.4791,-42.29228 -30.6897,-104.66935 -45.4549,-127.65738 -2.8185,-4.38814 -9.9793,-17.72378 -15.9131,-29.63473 -10.9261,-21.9327 -15.4598,-29.04706 -38.8207,-60.91855
C 1136.799,513.10768 1065.6618,453.0421 957.44091,394.75697 906.80059,367.48338 825.70337,344.10714 741.7617,332.58756
l -33.1514,-4.54948 -50.65057,-0.002
c -49.88505,-0.002 -72.95152,1.71349 -106.90142,7.95438 -9.47078,1.74097 -22.38551,3.79915 -28.69936,4.57372 -38.90063,4.77224 -111.65214,30.20836 -160.06214,55.96253 -21.1074,11.22912 -39.16845,20.41662 -40.13596,20.41662 -30.31886,0 -214.22028,179.11247 -214.22028,208.64177 0,0.73216 -3.9424,7.17337 -8.760384,14.314
C 52.377705,709.25788 26.612122,780.21757 12.68927,878.09737
l -5.7704048,40.56862 0.071227,47.19582
c 0.039028,25.9577 1.0092974,54.37659 2.1563527,63.15299 1.1470561,8.7765 3.1899971,26.6626 4.5397851,39.7468 4.988626,48.3537 34.371933,142.5572 55.151172,176.815 2.281486,3.7613 10.108141,18.1228 17.392553,31.9143 51.005165,96.5664 132.405375,177.8969 251.079895,250.865 11.87211,7.2997 27.88632,15.4917 35.58724,18.2044 7.70058,2.7128 18.65061,7.3832 24.33312,10.3786
l 10.33168,5.4467 16.40343,0.8343 16.40332,0.8343 10.50126,-6.1102
c 6.78598,-3.9485 13.77595,-10.9795 19.75782,-19.8734
l 9.25645,-13.763 -0.0508,-15.1276
c -0.11938,-35.7024 -16.95578,-50.7158 -61.78711,-55.0959 -117.43675,-11.4736 -241.59819,-107.0639 -310.80124,-239.2821 -9.515227,-18.1798 -18.85745,-38.1833 -20.760407,-44.4522 -1.902846,-6.2689 -7.180252,-20.1174 -11.727599,-30.7745 -9.275169,-21.7378 -12.599935,-33.3275 -19.945121,-69.5277
l -5.088047,-25.0756 0.372168,-73.29977 0.371948,-73.29991 7.089198,-34.98087
c 17.967387,-88.65763 55.16012,-171.6014 98.35333,-219.33955 4.68137,-5.17405 13.9601,-16.31551 20.61917,-24.75921 30.27398,-38.38593 68.61791,-67.48445 128.17794,-97.27221 263.82129,-131.94424 569.22845,54.68271 611.44245,373.63799
l 2.8663,21.65618 -1.5777,657.66355 -1.57725,657.6638 -3.3362,22.796
c -11.199,76.5169 -119.64017,220.1609 -166.07941,219.9927
l -3.21206,-0.023 1.46412,31.3444
c 0.80522,17.2394 2.155,55.4512 2.99971,84.915 0.84469,29.4637 2.14784,55.7537 2.89583,58.4222
l 1.36038,4.8517 371.32783,-206.5961 371.3281,-206.5959 0.04,-91.7538
c 0.023,-50.4646 -0.3452,-91.7538 -0.8175,-91.7538 -0.4723,0 -5.5441,2.5999 -11.2708,5.7778
l -10.4116,5.7777 -20.2985,2.3131
c -46.1675,5.2611 -87.1081,-17.4268 -113.7558,-63.0391 -12.9995,-22.2511 -12.7976,-19.9038 -14.2253,-165.3425
l -1.334,-135.867 174.9871,-100.0713
c 96.2429,-55.0393 176.8287,-100.4001 179.0792,-100.802
l 4.0923,-0.7306 -0.057,262.8843
c -0.069,315.3038 1.4716,347.975 19.5477,414.6894 22.4641,82.911 72.7829,184.8754 114.1368,231.2833 5.5289,6.2049 16.4442,19.1298 24.2557,28.7219 28.474,34.9644 96.4525,94.2916 132.5224,115.6572 5.0512,2.9919 16.9327,10.2955 26.4035,16.2302 47.2153,29.5864 137.2847,65.537 190.7671,76.1436 15.6727,3.1082 35.2114,7.2325 43.4194,9.1653 8.208,1.9327 21.6393,3.6191 29.8474,3.7474 8.208,0.1277 20.0895,1.0805 26.4034,2.1159 16.2858,2.6706 98.573,0.3107 128.5729,-3.6874
z'
          />
        </g>
      </svg>
    </div>
  )
}

export default Logo
