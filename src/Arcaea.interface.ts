export interface IArcLoginResponse{
    success: boolean;
    token_type: string;
    access_token: string;
}
export interface IArcScore {
    rating: number;
    modifier: number;
    time_played: number;
    health: number;
    best_clear_type: number;
    clear_type: number;
    miss_count: number;
    near_count: number;
    perfect_count: number;
    shiny_perfect_count: number;
    score: number;
    difficulty: number;
    song_id: string;
}
export interface IArcCharacter {
    is_uncapped: boolean;
    uncap_cores: any[];
    char_type: number;
    skill_unlock_level: number;
    skill_id: string;
    overdrive: number;
    prog: number;
    frag: number;
    level_exp: number;
    exp: number;
    level: number;
    name: string;
    character_id: number;
}
export interface IArcFriendInfo {
    is_mutual: boolean;
    is_char_uncapped: boolean;
    is_skill_sealed: boolean;
    rating: number;
    join_date: number;
    character: number;
    recent_score: IArcScore[];
    name: string;
    user_id: number;
}
export interface IArcSetting {
    favorite_character: number,
    is_hide_rating: boolean
}

export interface IArcAppregate {
    is_aprilfools: boolean;
    curr_available_maps: string[];
    character_stats: IArcCharacter[];
    friends: IArcFriendInfo[];
    settings: IArcSetting;
    user_id: number;
    name: string;
    user_code: string;
    display_name: string;
    ticket: number;
    character: number;
    is_skill_sealed: boolean;
    current_map: string;
    next_fragstam_ts: number;
    max_stamina_ts: number;
    stamina: number;
    world_songs: string[];
    singles: [];
    packs: [];
    characters: number[];
    cores: IArcCoreItem[];
    recent_score: [];
    max_friend: number;
    rating: number;
    join_date: number;
    is_locked_name_duplicate: boolean;
    prog_boost: number;
}

export interface IArcCoreItem{
    core_type: string;
    amount: number;
    _id: string;
}

export interface IArcPackInfo {
    name: string;
    items: IArcPackItem[];
    price: number;
    orig_price: number;
    discount_from: number;
    discount_to: number;
}
export interface IArcPackItem {
    id: string;
    type: string;
    is_available: boolean;
}
export interface IArcAppregateResponse {
    success: boolean;
    value?: [
        {
            id: number;
            value: IArcAppregate;
        },
        {
            id: number;
            value: IArcPackInfo[];
        }
    ];
}
export interface IArcAddResponse {
    success: boolean;
    value?: {
        user_id: number;
        updatedAt: string;
        createdAt: string;
        friends: IArcFriendInfo[];
    }
}
export interface IArcRankItem {
    user_id: number;
    song_id: string;
    difficulty: number;
    score: number;
    shiny_perfect_count: number;
    perfect_count: number;
    near_count: number;
    miss_count: number;
    health: number;
    modifier: number;
    time_played: number;
    best_clear_type: number;
    clear_type: number;
    name: string;
    character: number;
    is_skill_sealed: boolean;
    is_char_uncapped: boolean;
}
export interface IArcSelfRankItem extends IArcRankItem {
    rank: number;
}
export interface IArcRankResponse {
    success: boolean;
    value?: IArcRankItem[];
}
export interface IArcSelfRankResponse {
    success: boolean;
    value?: IArcSelfRankItem[];
}
export interface IArcPurchaseFriendResponse {
    success: boolean;
    value?: {
        user_id: number;
        max_friend: number;
    }
}