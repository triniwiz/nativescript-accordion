<template>
	<Page>
		<ActionBar title="Multi Templates">
			<NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="goBack"/>
		</ActionBar>
		<GridLayout columns="*" rows="auto,auto,*">
			<Button row="0" text="Expand All" @tap="expandAll"></Button>
			<Button row="1" text="Collapse All" @tap="collapseAll"></Button>
			<Accordion row="2" height="100%" ref="accordion" allowMultiple="true" childItems="children" for="item of items">
				<v-template if="$odd" name="header-odd">
					<StackLayout>
						<Label backgroundColor="green" :text="item.headerText"></Label>
					</StackLayout>
				</v-template>

				<v-template if="$even" name="header-even">
					<StackLayout>
						<Label backgroundColor="orange" :text="item.headerText"></Label>
					</StackLayout>
				</v-template>

				<v-template if="$odd" name="title-odd">
					<StackLayout backgroundColor="white">
						<Label :text="item.title"></Label>
					</StackLayout>
				</v-template>

				<v-template if="$even" name="title-even">
					<StackLayout backgroundColor="white">
						<Label :text="item.title"></Label>
						<Image height="50" decodeWidth="50" decodeHeight="50" loadMode="async"
							   :src="item.image"></Image>
					</StackLayout>
				</v-template>


				<v-template if="$odd" name="content-odd">
					<StackLayout>
						<Image height="100" decodeWidth="100" decodeHeight="100" loadMode="async" :src="item.image"></Image>
						<Label height="200" :text="item.text"></Label>
					</StackLayout>
				</v-template>

				<v-template if="$even" name="content-even">
					<StackLayout backgroundColor="red">
						<Image height="100" decodeWidth="100" decodeHeight="100" loadMode="async" :src="item.image"></Image>
						<Label backgroundColor="yellow" :text="item.text"></Label>
					</StackLayout>
				</v-template>

				<v-template if="$odd" name="footer-odd">
					<StackLayout backgroundColor="yellow">
						<Label :text="item.footerText"></Label>
					</StackLayout>
				</v-template>

				<v-template if="$even" name="footer-even">
					<StackLayout backgroundColor="blue">
						<Label  :text="item.footerText"></Label>
					</StackLayout>
				</v-template>
			</Accordion>
		</GridLayout>
	</Page>
</template>

<script>
	export default {
		data() {
			return {
				items: [
					{
						title: '1 Title',
						footer: '10',
						headerText: 'First',
						footerText: '4',
						image: 'http://placehold.it/120x120&text=First',
						children: [
							{ image: '~/assets/images/a9ff17db85f8136619feb0d5a200c0e4.png',
								text: 'Someone' },
							{
								text: 'Help',
								image: '~/assets/images/svg.jpg'
							}
						]
					},
					{
						title: '2 Title',
						footer: '20',
						headerText: 'Second',
						footerText: '5',
						image: 'http://placehold.it/120x120&text=Second',
						children: [ {
							text: 'Me',
							image: '~/assets/images/shazam.jpg'
						}, { text: 'Stop', image: '~/assets/images/f29.png' } ]
					},
					{
						title: '3 Title',
						footer: '30',
						headerText: 'Third',
						footerText: '6',
						image: 'http://placehold.it/120x120&text=Third',
						children: [ { text: 'This', image: '~/assets/images/a9ff17db85f8136619feb0d5a200c0e4.png' }, {
							text: 'Thing',
							image: '~/assets/images/shazam.jpg'
						} ]
					},
					{
						title: '4 Title',
						footer: '40',
						headerText: 'Fourth',
						footerText: '7',
						image: 'http://placehold.it/120x120&text=Fourth',
						children: [ { text: 'Now', image: '~/assets/images/batman.png' }, {
							text: 'Please',
							image: '~/assets/images/batman.jpg'
						} ]
					}
				]
			}
		},
		methods: {
			goBack: function () {
				this.$navigateBack();
			},
			expandAll: function () {
				this.$refs.accordion.nativeView.expandAll();
			}, collapseAll: function () {
				this.$refs.accordion.nativeView.collapseAll();
			}
		}
	}
</script>

<style scoped>
	ActionBar {
		background-color: #53ba82;
		color: #ffffff;
	}

	.message {
		vertical-align: center;
		text-align: center;
		font-size: 20;
		color: #333333;
	}
</style>