interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const PencilIcon = (props: IconProps) => {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 5H9C7.11438 5 6.17157 5 5.58579 5.58579C5 6.17157 5 7.11438 5 9V15C5 16.8856 5 17.8284 5.58579 18.4142C6.17157 19 7.11438 19 9 19H15C16.8856 19 17.8284 19 18.4142 18.4142C19 17.8284 19 16.8856 19 15V12M9.31899 12.6911L15.2486 6.82803C15.7216 6.36041 16.4744 6.33462 16.9782 6.76876C17.5331 7.24688 17.5723 8.09299 17.064 8.62034L11.2329 14.6702L9 15L9.31899 12.6911Z"
        stroke="#464455"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const ThreeDotsIcon = (props: IconProps) => {
  return (
    <svg
      className="w-5 h-5"
      fill="#000000"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      {...props}
    >
      <path
        className="cls-1"
        d="M8,6.5A1.5,1.5,0,1,1,6.5,8,1.5,1.5,0,0,1,8,6.5ZM.5,8A1.5,1.5,0,1,0,2,6.5,1.5,1.5,0,0,0,.5,8Zm12,0A1.5,1.5,0,1,0,14,6.5,1.5,1.5,0,0,0,12.5,8Z"
      />
    </svg>
  );
};

export const PlusIcon = (props: IconProps) => {
  return (
    <svg
      className="w-5 h-5"
      fill="#000000"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -0.5 21 21"
      {...props}
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          transform="translate(-379.000000, -240.000000)"
          fill="#000000"
          className="fill-current"
        >
          <g id="icons" transform="translate(56.000000, 160.000000)">
            <polygon
              id="plus-[#1512]"
              points="344 89 344 91 334.55 91 334.55 100 332.45 100 332.45 91 323 91 323 89 332.45 89 332.45 80 334.55 80 334.55 89"
            ></polygon>
          </g>
        </g>
      </g>
    </svg>
  );
};

export const CloseIcon = (props: IconProps) => {
  return (
    <svg
      className="w-5 h-5"
      fill="#000000"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      {...props}
    >
      <path d="M512.481 421.906L850.682 84.621c25.023-24.964 65.545-24.917 90.51.105s24.917 65.545-.105 90.51L603.03 512.377 940.94 850c25.003 24.984 25.017 65.507.033 90.51s-65.507 25.017-90.51.033L512.397 602.764 174.215 940.03c-25.023 24.964-65.545 24.917-90.51-.105s-24.917-65.545.105-90.51l338.038-337.122L84.14 174.872c-25.003-24.984-25.017-65.507-.033-90.51s65.507-25.017 90.51-.033L512.48 421.906z" />
    </svg>
  );
};

export const FolderIcon = (props: IconProps) => {
  return (
    <svg
      className="w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M3.5 7.5C3.5 6.09987 3.5 5.3998 3.77248 4.86502C4.01217 4.39462 4.39462 4.01217 4.86502 3.77248C5.3998 3.5 6.09987 3.5 7.5 3.5H16.5C17.9001 3.5 18.6002 3.5 19.135 3.77248C19.6054 4.01217 19.9878 4.39462 20.2275 4.86502C20.5 5.3998 20.5 6.09987 20.5 7.5V16.5C20.5 17.9001 20.5 18.6002 20.2275 19.135C19.9878 19.6054 19.6054 19.9878 19.135 20.2275C18.6002 20.5 17.9001 20.5 16.5 20.5H7.5C6.09987 20.5 5.3998 20.5 4.86502 20.2275C4.39462 19.9878 4.01217 19.6054 3.77248 19.135C3.5 18.6002 3.5 17.9001 3.5 16.5V7.5Z"
        stroke="#222222"
      />
      <path
        d="M3.5 8.5H6.26393C7.23426 8.5 7.71942 8.5 8.12999 8.69724C8.25717 8.75834 8.37753 8.83272 8.48906 8.91915C8.84909 9.19817 9.06606 9.63211 9.5 10.5V10.5C9.93394 11.3679 10.1509 11.8018 10.5109 12.0808C10.6225 12.1673 10.7428 12.2417 10.87 12.3028C11.2806 12.5 11.7657 12.5 12.7361 12.5H17.5C18.4319 12.5 18.8978 12.5 19.2654 12.3478C19.7554 12.1448 20.1448 11.7554 20.3478 11.2654C20.5 10.8978 20.5 10.4319 20.5 9.5V9.5"
        stroke="#222222"
      />
      <path d="M7 16H15" stroke="#222222" stroke-linecap="round" />
    </svg>
  );
};
