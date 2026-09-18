export default function WhatsappBtn() {
	return (
		<>
			<style>{`
				.whatsapp-button {
					position: fixed;
					right: 24px;
					bottom: 24px;
					z-index: 1000;
					display: inline-flex;
					align-items: center;
					justify-content: center;
					width: 58px;
					height: 58px;
					perspective: 600px;
					color: #ffffff;
					background: linear-gradient(145deg, #42e87d 0%, #25d366 52%, #13a851 100%);
					border: 3px solid #ffffff;
					border-radius: 50%;
					box-shadow: 0 10px 0 #108844, 0 15px 28px rgba(18, 140, 67, 0.3), inset 0 2px 3px rgba(255, 255, 255, 0.5);
					animation: whatsapp-float 3.6s ease-in-out infinite;
					transition: transform 220ms ease, box-shadow 220ms ease;
			}

				.whatsapp-button::before {
					content: "";
					position: absolute;
					inset: -7px;
					border: 1px solid rgba(37, 211, 102, 0.45);
					border-radius: 50%;
					animation: whatsapp-ring 3.6s ease-out infinite;
					pointer-events: none;
				}

				.whatsapp-button::after {
					content: "";
					position: absolute;
					inset: 4px;
					border-radius: 50%;
					background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), transparent 45%);
					pointer-events: none;
				}

				.whatsapp-button:hover,
				.whatsapp-button:focus-visible {
					animation-play-state: paused;
					transform: translateY(-5px) rotateX(8deg) rotateY(-10deg) scale(1.06);
					box-shadow: 0 12px 0 #108844, 0 20px 32px rgba(18, 140, 67, 0.38), inset 0 2px 3px rgba(255, 255, 255, 0.55);
				}

				.whatsapp-button:active {
					transform: translateY(2px) scale(0.97);
					box-shadow: 0 4px 0 #108844, 0 8px 16px rgba(18, 140, 67, 0.25);
				}

				.whatsapp-button:focus-visible {
					outline: 3px solid rgba(37, 211, 102, 0.45);
					outline-offset: 4px;
				}

				.whatsapp-button svg {
				position: relative;
				z-index: 1;
					width: 29px;
					height: 29px;
					fill: currentColor;
				filter: drop-shadow(0 2px 1px rgba(8, 93, 42, 0.28));
				transition: transform 220ms ease;
			}

				.whatsapp-button:hover svg,
				.whatsapp-button:focus-visible svg {
					transform: translateZ(12px) rotate(-6deg);
				}

				.whatsapp-button-label {
					position: absolute;
					right: calc(100% + 12px);
					padding: 7px 10px;
					color: #173323;
					background: #ffffff;
					border-radius: 6px;
					box-shadow: 0 5px 18px rgba(14, 42, 26, 0.14);
					font: 600 12px/1.2 system-ui, sans-serif;
					white-space: nowrap;
					opacity: 0;
					pointer-events: none;
					transform: translateX(5px);
					transition: opacity 180ms ease, transform 180ms ease;
				}

				.whatsapp-button:hover .whatsapp-button-label,
				.whatsapp-button:focus-visible .whatsapp-button-label {
					opacity: 1;
					transform: translateX(0);
				}

				@media (max-width: 640px) {
					.whatsapp-button {
						right: 16px;
						bottom: 16px;
						width: 54px;
						height: 54px;
					}
				}

				@keyframes whatsapp-float {
					0%, 100% { transform: translateY(0) rotateX(0) rotateY(0); }
					50% { transform: translateY(-5px) rotateX(2deg) rotateY(-3deg); }
				}

				@keyframes whatsapp-ring {
					0%, 55% { opacity: 0; transform: scale(0.92); }
					65% { opacity: 0.75; }
					100% { opacity: 0; transform: scale(1.3); }
				}

				@media (prefers-reduced-motion: reduce) {
					.whatsapp-button,
					.whatsapp-button::before {
						animation: none;
					}
				}
			`}</style>
			<a
				className="whatsapp-button"
				href="https://wa.me/923072274835"
				target="_blank"
				rel="noreferrer"
				aria-label="Chat with us on WhatsApp"
			>
				<span className="whatsapp-button-label" aria-hidden="true">
					Chat on WhatsApp
				</span>
				<svg viewBox="0 0 32 32" aria-hidden="true">
					<path d="M16 3.2a12.7 12.7 0 0 0-10.9 19.2L3.5 28.8l6.6-1.6A12.8 12.8 0 1 0 16 3.2Zm0 23.3a10.5 10.5 0 0 1-5.4-1.5l-.4-.2-3.9.9 1-3.8-.3-.4A10.5 10.5 0 1 1 16 26.5Zm5.8-7.8c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3 1.8.8 2.5.9 3.4.8.5-.1 1.8-.7 2.1-1.3.3-.6.3-1.2.2-1.3 0-.2-.2-.3-.4-.4Z" />
				</svg>
			</a>
		</>
	)
}
