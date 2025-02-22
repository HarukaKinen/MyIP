<template>
	<div class="flex flex-col p-10">
		<Card class="flex flex-col justify-center items-center m-4 p-4">
			<CardTitle class="font-bold text-center text-xl mb-4"
				>你的 IP 地址</CardTitle
			>
			<div class="mb-2">
				<Skeleton v-if="loading.ipify" class="h-6 w-[250px]" />
				<span v-else class="text-center">{{ ipify }}</span>
			</div>
			<div>
				<Skeleton v-if="loading.ipify" class="h-6 w-[250px]" />
				<span v-else class="text-center">{{ ipifyV6 }}</span>
			</div>
		</Card>
		<div class="flex flex-wrap flex-row gap-4 m-4">
			<Card class="container grow basis-1/3 mx-auto p-4">
				<div>
					<CardTitle class="font-bold text-center text-xl mb-4">
						Bancho 命中测试
					</CardTitle>
					<CardContent
						class="flex flex-col justify-center items-center"
					>
						<Table class="mb-4">
							<TableHeader>
								<TableRow>
									<TableHead class="w-[100px]">
										分支
									</TableHead>
									<TableHead class="w-[250px]">IP</TableHead>
									<TableHead class="text-right"
										>国家或地区
									</TableHead>
								</TableRow>
							</TableHeader>

							<TableBody>
								<TableRow>
									<TableCell class="font-medium">
										Stable
									</TableCell>
									<TableCell>
										<Skeleton
											v-if="loading.bancho"
											class="h-5 w-[250px]"
										/>
										<span v-else>{{ cloudflare.ip }}</span>
									</TableCell>
									<TableCell
										class="grid text-right justify-items-end"
									>
										<Skeleton
											v-if="loading.bancho"
											class="h-5 w-[100px]"
										/>
										<span v-else>
											{{
												getCountry(
													bancho.country || "Unknown"
												)
											}}
										</span>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell class="font-medium">
										Lazer
									</TableCell>
									<TableCell>
										<Skeleton
											v-if="loading.cloudflare"
											class="h-5 w-[250px]"
										/>
										<span v-else>{{ cloudflare.ip }}</span>
									</TableCell>
									<TableCell
										class="grid text-right justify-items-end"
									>
										<Skeleton
											v-if="loading.cloudflare"
											class="h-5 w-[100px]"
										/>
										<span v-else>
											{{
												getCountry(
													cloudflare.loc || "Unknown"
												)
											}}</span
										>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell class="font-medium">
										osu-web
									</TableCell>
									<TableCell>
										<Skeleton
											v-if="loading.cloudflare"
											class="h-5 w-[250px]"
										/>
										<span v-else>{{ cloudflare.ip }}</span>
									</TableCell>
									<TableCell
										class="grid text-right justify-items-end"
									>
										<Skeleton
											v-if="loading.cloudflare"
											class="h-5 w-[100px]"
										/>
										<span v-else>
											{{
												getCountry(
													cloudflare.loc || "Unknown"
												)
											}}</span
										>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>

						<svg
							viewBox="0 0 450 100"
							width="75%"
							height="auto"
							font-family="Aller"
							class="mb-4"
						>
							<rect
								width="450"
								height="100"
								fill="#091b45"
								stroke="white"
								stroke-width="3"
								rx="10"
							/>
							<rect
								width="450"
								height="100"
								fill="rgba(255, 255, 255, 0.15)"
							/>
							<image
								x="0"
								y="0"
								width="105"
								height="105"
								xlink:href="https://osu.ppy.sh/images/layout/avatar-guest.png"
							/>
							<text
								x="115"
								y="5"
								alignment-baseline="hanging"
								font-size="24"
								text-anchor="start"
								fill="white"
							>
								Username
							</text>
							<text
								x="113"
								y="32"
								alignment-baseline="hanging"
								font-size="18"
								text-anchor="start"
								fill="white"
							>
								{{ currentTime }} @
								{{ getCountry(bancho.country || "Unknown") }}
							</text>
							<text
								x="113"
								y="54"
								alignment-baseline="hanging"
								font-size="18"
								text-anchor="start"
								fill="white"
							>
								Idle
							</text>
							<text
								x="450"
								y="90"
								font-size="56"
								text-anchor="end"
								fill="#536389"
							>
								#1337
							</text>
						</svg>
					</CardContent>
				</div>
			</Card>
			<Card class="container grow basis-1/3 mx-auto p-4">
				<div>
					<CardTitle class="font-bold text-center text-xl"
						>IP 地址查询</CardTitle
					>
					<CardContent>
						<Table class="mb-4">
							<TableHeader>
								<TableRow>
									<TableHead class="w-[150px]">
										来源
									</TableHead>
									<TableHead class="w-[250px]">IP</TableHead>
									<TableHead>国家或地区 </TableHead>
									<TableHead>城市 </TableHead>
								</TableRow>
							</TableHeader>

							<TableBody>
								<TableRow>
									<TableCell class="font-medium">
										IPify
									</TableCell>
									<TableCell>
										<Skeleton
											v-if="loading.ipify"
											class="h-5 w-[250px]"
										/>
										<span v-else>{{ ipify }}</span>
									</TableCell>
									<TableCell class=""> 来源不适用 </TableCell>
									<TableCell class=""> 来源不适用 </TableCell>
								</TableRow>
								<TableRow>
									<TableCell class="font-medium">
										IPify IPv6
									</TableCell>
									<TableCell>
										<Skeleton
											v-if="loading.ipify"
											class="h-5 w-[250px]"
										/>
										<span v-else>{{ ipifyV6 }}</span>
									</TableCell>
									<TableCell class=""> 来源不适用 </TableCell>
									<TableCell class=""> 来源不适用 </TableCell>
								</TableRow>
								<TableRow>
									<TableCell class="font-medium">
										Cloudflare Trace
									</TableCell>
									<TableCell>
										<Skeleton
											v-if="loading.cloudflare"
											class="h-5 w-[250px]"
										/>
										<span v-else>{{ cloudflare.ip }}</span>
									</TableCell>
									<TableCell class="">
										<Skeleton
											v-if="loading.bancho"
											class="h-5 w-[100px]"
										/>
										<span v-else>
											{{
												getCountry(
													cloudflare.loc || "Unknown"
												)
											}}</span
										>
									</TableCell>
									<TableCell class=""> 来源不适用 </TableCell>
								</TableRow>
								<TableRow>
									<TableCell class="font-medium">
										IP.SB
									</TableCell>
									<TableCell>
										<Skeleton
											v-if="loading.IPSB"
											class="h-5 w-[250px]"
										/>
										<span v-else>{{ IPSB.ip }}</span>
									</TableCell>
									<TableCell class="">
										<Skeleton
											v-if="loading.IPSB"
											class="h-5 w-[100px]"
										/>
										<span v-else>
											{{
												getCountry(
													IPSB.country || "Unknown"
												)
											}}</span
										>
									</TableCell>
									<TableCell class="">
										<Skeleton
											v-if="loading.IPSB"
											class="h-5 w-[100px]"
										/>
										<span v-else> {{ IPSB.city }}</span>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</CardContent>
				</div>
			</Card>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDark } from "@vueuse/core";

import {
	getIpify,
	getIpifyV6,
	getCloudflare,
	getBanchoGeoIP2,
	getIPSB,
} from "@/lib/api";
import { getTime } from "@/lib/libs";
import { getCountryName } from "@/lib/metadata";

import { Skeleton } from "@/components/ui/skeleton";

// import { Button } from "@/components/ui/button";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

useDark();

const { currentTime } = getTime();

const loading = ref({
	ipify: true,
	ipifyV6: true,
	cloudflare: true,
	bancho: true,
	IPSB: true,
});

const ipify = ref<string | null>(null);
const ipifyV6 = ref<string | null>(null);
const cloudflare = ref<{
	loc: string | null;
	ip: string | null;
	colo: string | null;
}>({ loc: null, ip: null, colo: null });
const bancho = ref<{
	country: string | null;
	city: string | null;
}>({ country: null, city: null });
const IPSB = ref<{
	ip: string | null;
	country: string | null;
	city: string | null;
}>({ ip: null, country: null, city: null });

const getCountry = (code: string) => {
	return getCountryName(code) || "Unknown";
};

const fetchData = async () => {
	try {
		// Fetch ipify data
		const ipifyData = await getIpify();
		ipify.value = ipifyData.ip;
		loading.value.ipify = false;
		const ipifyV6Data = await getIpifyV6();
		ipifyV6.value = ipifyV6Data.ip;
		loading.value.ipifyV6 = false;

		// Fetch cloudflare data after ipify data is fetched
		const cloudflareData = await getCloudflare();
		cloudflare.value = {
			loc: cloudflareData.loc,
			ip: cloudflareData.ip,
			colo: cloudflareData.colo,
		};
		loading.value.cloudflare = false;

		const banchoData = await getBanchoGeoIP2(cloudflareData.ip);
		bancho.value = {
			country: banchoData.country,
			city: banchoData.city,
		};
		loading.value.bancho = false;

		const IPSBData = await getIPSB();
		IPSB.value = {
			ip: IPSBData.ip,
			country: IPSBData.country,
			city: IPSBData.city,
		};
		loading.value.IPSB = false;
	} catch (error) {
		console.error("Error fetching data:", error);
		loading.value.ipify = false;
		loading.value.ipifyV6 = false;
		loading.value.cloudflare = false;
		loading.value.bancho = false;
		loading.value.IPSB = false;
	}
};

onMounted(() => {
	fetchData();
});
</script>
