import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 24,
                    background: '#3e0953',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffe149',
                    borderRadius: '20%',
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1086.13 1086.13"
                    style={{ width: '80%', height: '80%' }}
                >
                    <path fill="#ffe149" d="M985.33,476.25c0-83.9-68.02-151.92-151.92-151.92s-151.92,68.02-151.92,151.92c0,54.17,28.38,101.69,71.06,128.59-39.82,74.34-120.78,123-209.49,123.77-88.7-.77-169.67-49.42-209.49-123.77,42.68-26.89,71.06-74.41,71.06-128.59,0-83.9-68.02-151.92-151.92-151.92s-151.92,68.02-151.92,151.92c0,77.92,58.68,142.11,134.26,150.86.36.84.72,1.67,1.08,2.51,17.03,38.67,41.38,73.36,72.37,103.11,30.83,29.62,66.73,52.84,106.63,69.06,40.57,16.48,83.61,24.97,127.92,25.21,44.31-.24,87.35-8.73,127.92-25.21,39.91-16.22,75.8-39.44,106.63-69.06,30.98-29.75,55.33-64.43,72.37-103.11.36-.84.72-1.67,1.08-2.51,75.58-8.75,134.26-72.94,134.26-150.86Z" />
                </svg>
            </div>
        ),
        {
            ...size,
        }
    )
}
