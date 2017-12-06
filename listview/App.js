import React, { Component } from 'react';
import {
    Platform,
	StyleSheet,
	Text,
    View,
    FlatList,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { 
    List, 
    ListItem,
    SearchBar,
} from 'react-native-elements';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            refreshing: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            search: [],
            onSearch: false,
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const { page, seed } = this.state;
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=10`;

        this.setState({ 
            loading: true 
        });

        fetch(url)
            .then(response => response.json())
            .then(response => {
                setTimeout(() => {
                    this.setState({
                        data: page === 1
                            ? response.results
                            : [...this.state.data, ...response.results],
                        page: this.state.page + 1,
                        error: response.error || null,
                        loading: false,
                        refreshing: false,
                    });
                }, 2000);
            })
            .catch(error => {
                this.setState({ 
                    error, 
                    loading: false,
                    refreshing: false,
                });
            });
    };

    _keyExtractor = (item, index) => {
        return `${item.email}_${index}`;
    };

    _renderListItem = ({ item }) => {
        return (this.state.data.length > 0 || 
                this.state.search.length > 0)
            ? (
                <ListItem
                    roundAvatar
                    containerStyle={styles.listItemContainer}
                    avatarStyle={styles.avatarStyle}
                    titleContainerStyle={styles.titleContainer}
                    subtitleContainerStyle={styles.subtitleContainer}
                    title={`${item.name.first} ${item.name.last}`}
                    subtitle={item.email}
                    avatar={{ uri: item.picture.thumbnail }}
                />
            ) 
            : (
                <View>
                    <Text>No Data, please try search others.</Text>
                </View>
            )
    };

    _renderSeparator = (sectionId, rowId) => (
        <View key={rowId} style={styles.separator} />
    );

    _renderHeader = () => {
        return (
            <SearchBar
                round
                lightTheme
                placeholder={'Search'}
                onChangeText={this.onSearchContact}
                onClearText={this.onSearchContact}
            />
        );
    };

    _renderFooter = () => {
        return this.state.loading ? (
            <View style={styles.loader}>
                <ActivityIndicator animating size="large"/> 
            </View>
        ) : null;
    };

    _onEndReached = () => {
        if (!this.state.onSearch) {
            this.makeRemoteRequest();
        }
    };

    _onRefresh = () => {
        this.setState({
            page: 1,
            refreshing: true,
            seed: this.state.seed + 1,
        }, () => {
            this.makeRemoteRequest();
        });
    };

    onSearchContact = (criteria) => {
        if (criteria.length > 0) {
            let match = this.state.data.filter((user) => {
                let matched = false;

                for (let key in user) {
                    if (this.compareMatch(criteria.toString().toLowerCase(), user[key])) {
                        matched = true;
                        break;
                    }
                }

                return matched;
            });

            this.setState({
                serach: match,
                onSearch: true,
            });
        }
        else {
            this.setState({
                onSearch: false,
            });
        }
    };

    compareMatch = (criteria, data) => {
        if (typeof data == 'object') {
            for (let key in data) {
                if (typeof data[key] == 'object') {
                    if (this.compareMatch(criteria, data[key])) {
                        return true;
                    }
                }
                else {
                    if (data[key].toString().toLowerCase().indexOf(criteria) != -1) {
                        return true;
                    }
                }
            }
        }
        else {
            if (data.toString().toLowerCase().indexOf(criteria) != -1) {
                return true;
            }
        }

        return false;
    };

	render() {
		return (
            <List containerStyle={styles.listContainer}>
                <SearchBar
                    round
                    lightTheme
                    placeholder={'Search'}
                    onChangeText={this.onSearchContact}
                    onClearText={this.onSearchContact}
                />

                <FlatList
                    style={{ height: Dimensions.get('screen').height - (Platform.OS === 'ios' ? 68 : 0) }}
                    data={this.state.onSearch ? this.state.serach : this.state.data}
                    renderItem={this._renderListItem}
                    keyExtractor={this._keyExtractor}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={0}
                    ItemSeparatorComponent={this._renderSeparator}
                    ListFooterComponent={this._renderFooter}
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                />
            </List>
		);
	}
}

const styles = StyleSheet.create({
    listContainer: {
        borderTopWidth: 0, 
        borderBottomWidth: 0 
    },
    listItemContainer: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 0
    },
    avatarStyle: {
        marginTop: 3.5,
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    titleContainer: {
        marginLeft: 20,
    },
    subtitleContainer: {
        marginLeft: 20,
    },
    separator: {
        flex: 1,
        height: 1,
        width: '78%',
        marginLeft: '22%',
        backgroundColor: '#8E8E8E',
    },
    loader: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "#CED0CE"
    },
});
