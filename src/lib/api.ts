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
export async function getCloudflare(): Promise<{
	loc: string;
	ip: string;
	colo: string;
}> {
	const response = await fetch("https://osu.ppy.sh/cdn-cgi/trace");
	const traceData: string = await response.text();

	const data: CloudflareTrace = traceData
		.split("\n")
		.map((line) => line.split("="))
		.reduce((acc, [key, value]) => {
			acc[key] = value;
			return acc;
		}, {} as CloudflareTrace);

	return { loc: data.loc, ip: data.ip, colo: data.colo };
}

export async function getBanchoGeoIP2(ip: string): Promise<any> {
	let country = "XX";
	let city = "-";
	const response = await fetch(`https://geo-ip-2.vercel.app/${ip}`);
	if (response.status !== 200) {
		return { country, city };
	} else {
		const data = await response.json();
		if (data.country) {
			country = data.country.isoCode;
		}
		if (data.city) {
			city = data.city.names.en;
		}
		return { country, city };
	}
}

export async function getIPSB(): Promise<any> {
	let country = "XX";
	let city = "-";
	const response = await fetch(`https://api.ip.sb/geoip/`);
	if (response.status !== 200) {
        const ip = null
		return { ip, country, city };
	} else {
		const data = await response.json();
        const ip = data.ip;
		if (data.country_code) {
			country = data.country_code;
		}
		if (data.city) {
			city = data.city;
		}
		return { ip, country, city };
	}
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

// 定义 getIpify 函数，返回 Promise<IPAddress>
export const getIpifyV6 = (): Promise<IPAddress> => {
	return fetch("https://api64.ipify.org/?format=json")
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
