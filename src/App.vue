<template>
	<div class="flex flex-col p-10">
		<Card class="flex flex-col justify-center items-center m-4 p-4">
			<CardTitle class="font-bold text-center text-xl mb-4"
				>你的 IP 地址</CardTitle
			>
			<Skeleton v-if="loading.ipify" class="h-6 w-[250px]" />
			<span v-else class="text-center">{{ ipify }}</span>
		</Card>
		<div class="grid grid-cols-2 gap-2 m-4">
			<Card class="container mx-auto p-4">
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
									<TableHead>IP</TableHead>
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
											v-if="loading.cloudflare"
											class="h-5 w-[250px]"
										/>
										<span v-else>{{ ipify }}</span>
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
								{{ getCountry(cloudflare.loc || "Unknown") }}
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
			<Card class="container mx-auto p-4">
				<div>
					<CardTitle class="font-bold text-center text-xl"
						>IP 地址查询</CardTitle
					>
				</div>
			</Card>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDark } from "@vueuse/core";

import { getIpify, getCloudflare } from "@/lib/api";
import { getTime } from "@/lib/utils";
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
	cloudflare: true,
});

const ipify = ref<string | null>(null);
const cloudflare = ref<{
	loc: string | null;
	ip: string | null;
	colo: string | null;
}>({ loc: null, ip: null, colo: null });

const getCountry = (code: string) => {
	return getCountryName(code) || "Unknown";
};

const fetchData = async () => {
	try {
		// Fetch ipify data
		const ipifyData = await getIpify();
		ipify.value = ipifyData.ip;
		loading.value.ipify = false;

		// Fetch cloudflare data after ipify data is fetched
		const cloudflareData = await getCloudflare();
		cloudflare.value = {
			loc: cloudflareData.loc,
			ip: cloudflareData.ip,
			colo: cloudflareData.colo,
		};
		loading.value.cloudflare = false;
	} catch (error) {
		console.error("Error fetching data:", error);
		loading.value.ipify = false;
		loading.value.cloudflare = false;
	}
};

onMounted(() => {
	fetchData();
});
</script>
