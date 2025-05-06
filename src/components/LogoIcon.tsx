export function LogoIcon() {
  return (
    <div className="logo-icon">
      <div className="logo-icon__container">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="logo-icon__svg"
        >
          <path className="wave wave1" d="M8,24 Q13,24 16,14 T24,24 T32,29 T40,24" />
          <path className="wave wave2" d="M8,24 Q13,24 16,29 T24,19 T40,24" />
          <path className="wave wave3" d="M8,24 Q13,24 16,19 T24,29 T32,14 T40,24" />
        </svg>
      </div>
    </div>
  );
}