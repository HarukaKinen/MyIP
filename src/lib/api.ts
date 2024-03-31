// 定义 IP 地址的类型
interface IPAddress {
    ip: string;
}

// 定义 CloudflareTrace 类型
interface CloudflareTrace {
    [key: string]: string;
    fl: string;
    h: string;
    ip: string;
    ts: string;
    visit_scheme: string;
    uag: string;
    colo: string;
    sliver: string;
    http: string;
    loc: string;
    tls: string;
    sni: string;
    warp: string;
    gateway: string;
    rbi: string;
    kex: string;
}

// 定义 getCloudflare 函数，返回 Promise<{ loc: string, ip: string, colo: string }>
export async function getCloudflare(): Promise<{ loc: string, ip: string, colo: string }> {
    const response = await fetch('https://osu.ppy.sh/cdn-cgi/trace');
    const traceData: string = await response.text();

    const data: CloudflareTrace = traceData
        .split('\n')
        .map(line => line.split('='))
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {} as CloudflareTrace);

    return { loc: data.loc, ip: data.ip, colo: data.colo };
}

// 定义 getIpify 函数，返回 Promise<IPAddress>
export const getIpify = (): Promise<IPAddress> => {
    return fetch("https://api.ipify.org/?format=json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch IP address");
            }
            return response.json();
        })
        .then((data: IPAddress) => data)
        .catch((error) => {
            console.error("Error fetching IP address:", error);
            throw error; // 抛出错误，以便在组件中捕获
        });
};
